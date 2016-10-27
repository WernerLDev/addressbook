<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return view('home');
});

$app->get('/contacts', 'ApiController@retrieveContacts');
$app->post('/contacts/new', 'ApiController@createContact');
$app->get('/contacts/delete/{id}', 'ApiController@deleteContact');
$app->post('contacts/update/{id}', 'ApiController@updateContact');
$app->post('contacts/favorite/{id}', 'ApiController@setFavorite');
$app->post('contacts/uploadphoto', 'ApiController@uploadPhoto');

$app->get('test', 'ApiController@imagetest');
