<?php
/*
	Template Name: Avances
*/
$context = Timber::get_context();
$context['post'] = new TimberPost();

Timber::render('templates/avances.twig', $context);