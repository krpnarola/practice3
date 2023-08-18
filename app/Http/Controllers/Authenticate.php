<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use DataTables;

class Authenticate extends Controller
{
    public function index(){

    }
    
    public function store(Request $request){
        $register = new User();
        $register->name = $request->full_name;
        $register->email = $request->username;

        $register->save();
    }

    public function getUserinfo(){
        $user = User::where('email', 9737800015)->first();

        $response = [
            'username' => $user->name,
            'email' => $user->email
        ];
        return $response;
    }

    public function getUsers(Request $request){
        
        if ($request->ajax()) {
            $search_input = $request->input('columns');
            $length = $request->input('length');
            // dd($request->all());
            $query = User::select('id','name','email','created_at','email_verified_at');
            // $query->where('name', 'like', '%Ru%');
            // if(!empty($search_input)){
            //     foreach($search_input as $key => $val){
            //         if(isset($val['search']['value']) && !empty($val['search']['value'])){
            //             $search_input_val = $val['search']['value'];
            //             // continue;
            //             // $query->where(function($query) use ($search_input_val) {
            //             //     $query->where('name', 'like', '%' . $search_input_val . '%')
            //             //     ->orWhere('email', 'like', '%' . $search_input_val . '%')
            //             //     ->orWhere('created_at', 'like', '%' . $search_input_val . '%');
            //             // });
            //         }
            //         // dd($val['search']['value']);
            //     }
            // }

            $data = $query->get();
            // dd($data);

            return Datatables::of($data)
                    ->addIndexColumn()
                // ->addColumn('action', function($row){
                //     $btn = '<a href="javascript:void(0)" class="btn btn-primary btn-sm">View</a>';
                //     return $btn;
                // })
                // ->rawColumns(['action'])
                ->make(true);
        }

        // return view('users');
    }
}
