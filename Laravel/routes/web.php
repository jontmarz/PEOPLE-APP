<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;
use App\Http\Middleware\ApiAuthMiddleware;
// use Illuminate\Routing\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('test-orm', 'peopleController@test');

// Usuario
Route::post('api/register', 'userController@register');
Route::post('api/login', 'userController@login');

// People
Route::resource('/api/people', 'peopleController');
