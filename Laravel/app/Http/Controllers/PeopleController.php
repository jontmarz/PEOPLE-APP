<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use PHPUnit\Framework\Exception;
use App\People;
use App\Helpers\JwtAuth;

class PeopleController extends Controller
{
    public $params;
    public $params_array;

    public function __construct(Request $request)
    {
        $this->middleware('api_auth', ['except' => ['index',
                                                    'show',
        ]]);

        $json = $request->input('json', null);
        $this->params = json_decode($json);
        $this->params_array = json_decode($json, true);
    }

    public function test()
    {
        $peoples = People::all();

        foreach ($peoples as $people) {
            echo "<p>{$people->name}</p>";
            echo "<p>{$people->surname}</p>";
            echo "<p>{$people->docType}</p>";
            echo "<p>{$people->serie}</p>";
            echo "<p>{$people->email}</p>";
            echo "<p>{$people->phone}</p>";
            echo "<p>{$people->address}</p>";
            echo "<p>{$people->meet}</p>";
        }
    }

    public function getIdentity($request)
    {
        $jwtAuth = new JwtAuth();
        $token = $request->header('Authorization', null);
        $user = $jwtAuth->checkToken($token, true);
        return $user;
    }

    public function index()
    {
        $people = People::all();
        $data = [
            'status'    => 'success',
            'code'      => 200,
            'Person'    => $people
        ];

        return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $people = People::find($id)->load('user');

        if (is_object($people)) {
            $data = [
                'status'    => 'success',
                'code'      => 200,
                'Person'    => $people
            ];
        } else {
            $data = [
                'status'    => 'error',
                'code'      => 404,
                'message'   => 'No existe la persona'
            ];
        }
        return response()->json($data, $data['code']);
    }

    public function store(Request $request)
    {
        // var_dump('esta es una prueba'); die();
        // var_dump($this->params); die();
        if (!empty($this->params_array)) {
            $user = $this->getIdentity($request);

            $validate = \Validator::make($this->params_array,[
                'name'          => 'required|alpha|max:255',
                'surname'       => 'required|alpha|max:255',
                'docType'       => 'in:CC,CE,PASSPORT',
                'serie'         => 'required|min:6|max:11',
                'email'         => 'required|email|unique:people',
                'phone'         => 'nullable',
                'address'       => 'required|max:255',
                'meet'          => 'nullable|max:255'

            ]);

            if ($validate->fails()) {
                $data = [
                    'status'    => 'error',
                    'code'      => 404,
                    'message'   => 'No se han guardado los datos'
                ];
            } else {
                $people = new People();
                $people->user_id = $user->sub;
                $people->name = $this->params->name;
                $people->surname = $this->params->surname;
                $people->docType = $this->params->docType;
                $people->serie = $this->params->serie;
                $people->email = $this->params->email;
                $people->phone = $this->params->phone;
                $people->address = $this->params->address;
                $people->meet = $this->params->meet;
                $people->save();

                $data = [
                    'status'    => 'success',
                    'code'      => 200,
                    'Person'    => $people
                ];
            }

        } else {
            $data = [
                'status'    => 'error',
                'code'      => 404,
                'message'   => 'No se han guardado los datos de la persona'
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function create(Request $request)
    {
        echo('esta es una prueba');
    }

    public function update($id, Request $request)
    {

        $data = [
            'status'    => 'error',
            'code'      => 404,
            'massage'   => 'Datos enviados incorrectamente'
        ];
        // var_dump($this->params); die();
        if (!empty($this->params_array)) {
            $validate = \Validator::make($this->params_array, [
                'name'          => 'required',
                'surname'       => 'required',
                'email'         => 'required'
            ]);

            if ($validate->fails()) {
                $data['errors'] = $validate->errors();
                return response()->json($data, $data['code']);
            }

            unset($this->params_array['id']);
            unset($this->params_array['user_id']);
            unset($this->params_array['created_at']);
            unset($this->params_array['updated_at']);
            unset($this->params_array['user']);

            $user = $this->getIdentity($request);

            $people = People::where('id', $id)
                            ->where('user_id', $user->sub)
                            ->first();
            if (!empty($people) && is_object($people)) {
                $people->update($this->params_array);

                $data = [
                    'status'    => 'success',
                    'code'      => 200,
                    'Person'    => $this->params_array
                ];
            }
        }

        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $user =$this->getIdentity($request);


        $people = People::where('id', $id)
                        ->where('user_id', $user->sub);

        var_dump($user); die();

        // if (!empty($people)) {
        //     $people->delete();

        //     $data =[
        //         'status'    => 'success',
        //         'code'      => 200,
        //         'Person'    => $people
        //     ];
        // } else {
        //     $data =[
        //         'status'    => 'error',
        //         'code'      => 404,
        //         'message'   => 'Registro no existe'
        //     ];
        // }

        // return response()->json($data, $data['code']);
    }
}
