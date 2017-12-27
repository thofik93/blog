<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/welcome/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/', function(Request $request, Response $response){
	$this->logger->info("Home '/' route");
	return $this->renderer->render($response, 'index.phtml');
});