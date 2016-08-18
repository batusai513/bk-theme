<?php
    // ACF Options
    //----- Not Delete
    include_once( get_stylesheet_directory() . '/acf/acf.php' );
    add_filter('acf/settings/path', 'my_acf_settings_path');
    add_filter('acf/settings/dir', 'my_acf_settings_dir');
    function my_acf_settings_path( $path ) {
      $path = get_stylesheet_directory() . '/acf/';
      return $path;   
    }
    function my_acf_settings_dir( $dir ) {
      $dir = get_stylesheet_directory_uri() . '/acf/';
      return $dir;  
    }

    if(WP_ENV !== 'development'){
      add_filter('acf/settings/show_admin', '__return_false');
      require_once get_template_directory() . '/lib/custom-fields.php';
    }