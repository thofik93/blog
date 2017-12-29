<?php

use Slim\Http\Request;
use Slim\Http\Response;
use App\Controller\ArticleMapper;
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

$app->get('/home', function(Request $request, Response $response){
	$this->logger->info("Home '/' route");
	return $this->renderer->render($response, 'index.phtml');
});

$app->get('/detail/{id}', function(Request $request, Response $response, $args){
	$this->logger->info("Home '/' route");

	$id_article = (int) $args['id'];

	return $this->renderer->render($response, 'index.phtml');
});

$app->get('/get_latest_article_by_limit/{limit}', function(Request $request, Response $response, $args){
	
	$limit = (int) $args['limit'];

	$mapper = new ArticleMapper($this->pdo);
	$articles = $mapper->getArticleByLimit($limit);

	$response->getBody()->write(var_export($articles, true));

	return $response;
});

$app->get('/get_article_by_id/{id}', function(Request $request, Response $response, $args){
	
	$id = (int) $args['id'];

	$mapper = new ArticleMapper($this->pdo);
	$article = $mapper->getArticleById($id);

	$response->getBody()->write(var_export($article, true));

	return $response;
});
