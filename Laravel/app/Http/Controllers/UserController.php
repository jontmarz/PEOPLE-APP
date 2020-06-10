<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\User;

class UserController extends Controller
{
    public $params;
    public $params_array;

    public function __construct(Request $request)
    {
        $json = $request->input('json', null);

        $this->params = json_decode($json);
        $this->params_array = json_decode($json, true);
    }

    public function register(Request $request)
    {
        if (!empty($this->params) && !empty($this->params_array)) {

            $this->params_array = array_map('trim', $this->params_array);

            $validate = \Validator::make($this->params_array, [
                'name'      => 'required|alpha',
                'email'     => 'required|email|unique:users',
                'password'  => 'required'
                ]);

                if ($validate->fails()) {
                    $data = [
                        'status'    => 'error',
                        'code'      => 404,
                        'message'   => 'El usuario ya está registrado',
                        'errors'    => $validate->errors()
                    ];
                } else {
                // var_dump($this->params_array); die();
                $pwd = hash ('sha256', $this->params->password);

                $user = new User();
                $user->name = $this->params_array['name'];
                $user->email = $this->params_array['email'];
                $user->password = $pwd;

                $user->save();

                $data = [
                    'status'    => 'success',
                    'code'      => 200,
                    'message'   => 'El usuario se ha creado satisfactoriamente',
                ];
            }
        } else {
            $data = [
                'status'    => 'error',
                'code'      => 404,
                'message'   => 'Los datos enviados no son correctos',
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function login(Request $request)
    {
        $jwtAuth = new \JwtAuth;

    $validate = \Validator::make($this->params_array, [
        'email'     => 'required|email',
        'password'  => 'required'
    ]);

    if ($validate->fails()) {
        $singup = [
            'status'    => 'error',
            'code'      => 404,
            'message'   => 'El usuario no ha sido identificado',
            'error'     => $validate->errors()
        ];
    } else {
        $pwd = hash('sha256', $this->params->password);

        $singup = $jwtAuth->signup($this->params->email, $pwd);

        if (!empty($this->parms->getToken)) {
            $singup = $jwtAuth->signup($this->params->email, $pwd, true);
        }
    }

    return response()->json($singup, 200);
    }


}
