<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Authenticate;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register',[Authenticate::class,'store']);
Route::get('/users',[Authenticate::class,'getUserinfo']);
Route::get('/get-users',[Authenticate::class,'getUsers']);
Route::get('/get-user-name',[Authenticate::class,'getUserName']);
Route::get('/get-user-email',[Authenticate::class,'getUserEmail']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
