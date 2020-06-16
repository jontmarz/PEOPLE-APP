<?php
namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\User;

class JwtAuth {
    public $key;

    public function __construct()
    {
        $this->key = "Esta_llave_solo_la_conozco_yo_2568742";
    }

    public function signup($email, $password, $getToken = null) {

    /* verificar si existe el usuario con sus credenciales */
        $user = User::Where([
            'email'     => $email,
            'password'  => $password,
        ])->first();

        $signup = false;

        /* Comprobar si son correctas */
        if (is_object($user)) {
            $signup = true;
        }

    /* Generar los token del usuario identificado */
        if ($signup) {
            $token = [
                'sub'           => $user->id,
                'name'          => $user->name,
                'email'         => $user->email,
                'iat'       => time(),
                'exp'       => time() + (7 * 24 * 60 * 60), //cálculo de una semana
            ];

            $jwt = JWT::encode($token, $this->key, 'HS256');
            $decoded = JWT::decode($jwt, $this->key, ['HS256']);

            /* Devolver los datos decodificados o el token en función del parámetro */
            if (is_null($getToken)) {
                $data = $jwt;
            }else {
                $data = $decoded;
            }
        }else {
            $data = [
                'status'    => 'error',
                'message'   => 'Login Incorrecto',
            ];
        }

        return $data;
    }

    public function checkToken($jwt, $getIdentity = false) {
        $auth = false;

        try {
            $jwt = str_replace('"', '', $jwt);
            $decoded = JWT::decode($jwt, $this->key, ['HS256']);
        }catch (\UnexpectedValueException $e) {
            $auth = false;
        }catch (\DomainException $e) {
            $auth = false;

        }

        if (!empty($decoded) && is_object($decoded) && isset($decoded->sub)) {
            $auth = true;
        }else {
            $auth = false;
        }

        if ($getIdentity) {
            return $decoded;
        }

        return $auth;
    }
}
