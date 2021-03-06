# Your theme directory name (/web/app/themes/bk-theme)
themeName="bk-theme"
########################################

####################
# Usage
####################
# bash wpedeploy.sh nameOfRemote
####################
# Set variables
####################
# WP Engine remote to deploy to
wpengineRemoteName=$1
# Get present working directory
presentWorkingDirectory=`pwd`
# Get current branch user is on
#currentLocalGitBranch=`git rev-parse --abbrev-ref HEAD`
# Temporary git branch for building and deploying
#tempDeployGitBranch="wpedeployscript/${currentLocalGitBranch}"
# KWB themes directory
bedrockThemesDirectory="${presentWorkingDirectory}/web/app/themes/"

####################
# Perform checks before running script
####################

# Git checks
####################
# Halt if there are uncommitted files
# if [[ -n $(git status -s) ]]; then
#   echo -e "[\033[31mERROR\e[0m] Found uncommitted files on current branch \"$currentLocalGitBranch\".\n        Review and commit changes to continue."
#   git status
#   exit 1
# fi

# # Check if specified remote exist
# git ls-remote "$wpengineRemoteName" &> /dev/null
# if [ "$?" -ne 0 ]; then
#   echo -e "[\033[31mERROR\e[0m] Unknown git remote \"$wpengineRemoteName\"\n        Visit \033[32mhttps://wpengine.com/git/\e[0m to set this up."
#   echo "Available remotes:"
#   git remote -v
#   exit 1
# fi

# Directory checks
####################
# Halt if theme directory does not exist
if [ ! -d "$presentWorkingDirectory"/web/app/themes/"$themeName" ]; then
  echo -e "[\033[31mERROR\e[0m] Theme \"$themeName\" not found.\n        Set \033[32mthemeName\e[0m variable in $0 to match your theme in $bedrockThemesDirectory"
  echo "Available themes:"
  ls $bedrockThemesDirectory
  exit 1
fi

####################
# Begin deploy process
####################
# Checkout new temporary branch
#echo "Preparing theme on branch ${tempDeployGitBranch}..."
#git checkout -b "$tempDeployGitBranch" &> /dev/null

# Run composer
composer install

# WPE-friendly gitignore
rm .gitignore &> /dev/null
echo -e "/*\n!wp-content/" > ./.gitignore

# Copy meaningful contents of web/app into wp-content
mkdir wp-content && cp -rp web/app/plugins wp-content && cp -rp web/app/themes wp-content

# Go into theme directory
cd "$presentWorkingDirectory/wp-content/themes/$themeName" &> /dev/null

# Build theme assets
npm install && bower install && gulp --production

# Back to the top
cd "$presentWorkingDirectory"

# Cleanup wp-content
####################
# Remove sage theme cruft
# Files
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/.bowerrc &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/.editorconfig &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/.gitignore &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/.jscsrc &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/.jshintrc &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/.travis.yml &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/bower.json &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/gulpfile.js &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/package.json &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/composer.json &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/composer.lock &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/ruleset.xml &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/CHANGELOG.md &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/CONTRIBUTING.md &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/LICENSE.md &> /dev/null
rm "$presentWorkingDirectory"/wp-content/themes/"$themeName"/README.md &> /dev/null
# Directories
rm -rf "$presentWorkingDirectory"/wp-content/themes/"$themeName"/node_modules &> /dev/null
rm -rf "$presentWorkingDirectory"/wp-content/themes/"$themeName"/bower_components &> /dev/null
rm -rf "$presentWorkingDirectory"/wp-content/themes/"$themeName"/assets &> /dev/null
rm -rf "$presentWorkingDirectory"/wp-content/themes/"$themeName"/vendor &> /dev/null

####################
# Push to WP Engine
####################

# git ls-files | xargs git rm --cached &> /dev/null
# cd "$presentWorkingDirectory"/wp-content/
# find . | grep .git | xargs rm -rf
# cd "$presentWorkingDirectory"

# git add --all &> /dev/null
# git commit -am "WP Engine build from: $(git log -1 HEAD --pretty=format:%s)$(git rev-parse --short HEAD 2> /dev/null | sed "s/\(.*\)/@\1/")" &> /dev/null
# echo "Pushing to WPEngine..."

# # Push to a remote branch with a different name
# # git push remoteName localBranch:remoteBranch
# git push "$wpengineRemoteName" "$tempDeployGitBranch":master --force

# ####################
# # Back to a clean slate
# ####################
# git checkout "$currentLocalGitBranch" &> /dev/null
# rm -rf wp-content/ &> /dev/null
# git branch -D "$tempDeployGitBranch" &> /dev/null
echo "Done"
