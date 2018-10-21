<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/expenses', 'ExpensesController@getExpenses');
Route::post('/expenses/month', 'ExpensesController@getExpensesByMonth');
Route::post('/expenses/add', 'ExpensesController@addExpenses');
Route::post('/expenses/update', 'ExpensesController@updateExpenses');
Route::post('/expenses/delete', 'ExpensesController@deleteExpenses');

Route::get('/investments', 'InvestmentsController@getInvestments');
Route::post('/investments/month', 'InvestmentsController@getInvestmentsByMonth');
Route::post('/investments/add', 'InvestmentsController@addInvestments');
Route::post('/investments/update', 'InvestmentsController@updateInvestments');
Route::get('/investments/delete/{id}', 'InvestmentsController@deleteInvestments');

Route::get('/income', 'IncomeController@getIncome');
Route::post('/income/month', 'IncomeController@getIncomeByMonth');
Route::post('/income/add', 'IncomeController@addIncome');
Route::post('/income/update', 'IncomeController@updateIncome');
Route::get('/income/delete/{id}', 'IncomeController@deleteIncome');