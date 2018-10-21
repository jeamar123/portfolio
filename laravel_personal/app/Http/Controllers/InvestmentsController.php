<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DateTime;

use App\Investments;

class InvestmentsController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function getInvestments( ){
        return Investments::orderBy('created_at', 'asc')->get();
    }

    public function getInvestmentsByMonth( Request $request ){
        $data = array();

        $get_investments = Investments::whereBetween('full_date', [ new DateTime( $request->get('start') ) , new DateTime( $request->get('end') ) ])->get();
        
        if( $get_investments ){
            $data['status'] = true;
            $data['message'] = 'Success';
            $data['investments'] = $get_investments;
        }else{
            $data['status'] = false;
            $data['message'] = 'Failed';
        }

        return $data;
    }

    public function addInvestments( Request $request ){
        $data = array();
        $create = Investments::create([
                    // 'category_id' => $request->get('category_id'),   
                    'full_date' => $request->get('full_date'),
                    'day' => $request->get('day'),
                    'month' => $request->get('month'),
                    'year' => $request->get('year'),
                    'description' => $request->get('description'),
                    'value' => $request->get('value'),
                ]);

        if( $create ){
            $data['status'] = true;
            $data['message'] = 'Successfully added.';
        } else {
            $data['status'] = false;
            $data['message'] = 'Failed';
        }

        return $data;
    }

    public function updateInvestments( Request $request ){
        $data = array();
        
        $update_data = array(
            'description' => $request->get('description'),
            'value' => $request->get('value'),
        );

        $result = Investments::where('id', $request->get('id'))->update($update_data);
        if($result) {
            $data['status'] = true;
            $data['message'] = 'Successfully updated.';
        } else {
            $data['status'] = false;
            $data['message'] = 'Failed';
        }
        return $data;
    }

    public function deleteInvestments( $id ){
        $data = array();

        $delete_item = Investments::where('id', '=', $id)->delete();

        if( $delete_item ){
            $data['status'] = true;
        $data['message'] = 'Successfully deleted.';
        }else{
            $data['status'] = false;
            $data['message'] = 'Failed';
        }
        
        return $data;
    }

}