<?php
/*
	Template Name: Projects
*/
$context = Timber::get_context();
$context['post'] = new TimberPost();

Timber::render('templates/projects.twig', $context);