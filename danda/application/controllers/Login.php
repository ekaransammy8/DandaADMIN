<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	public function  __construct()
    {
		 
		 parent::__construct();
		 $this->load->model('Login_model');
		 //$this->load->model('Dashboard_model');
		 $this->load->library('form_validation');
		 $this->load->helper('form');
		 $this->load->helper('url');
		 
    }
    
	public function index()
	{   
			$this->load->view('login');
	} 
	
	
	
	public function do_login()
	{
		 if (!$this->input->is_ajax_request()) {
		        echo 'No direct script is allowed';
		        die;
		    }
		    $this->form_validation->set_rules('email', 'Email', 'trim|required');
		    $this->form_validation->set_rules('pass', 'Password', 'trim|required');

		    if ($this->form_validation->run() == false) {
		       /* $result['status'] = 'error';
		        $result['message'] = validation_errors();*/
		        $responce = array(
		              'status' => 'error',
		              'message'  => validation_errors(),
		              );
		        // print json_encode($result);
		    }else {
		        $email      = $this->input->post("email");
		        $password   = $this->input->post("pass");
		        $user = $this->Login_model->check_user('admin',array('email'=>$email,'password'=> $password));
		        print json_encode($user[0]['id']); die;
		       
		        if ($user) {
		           // $logged_in_data = array();
		          //  foreach ($user as $logged_in_data) {
		                $session = array(
		                    'session_id' => $user[0]['id'],
		                    'uniq_session_id' => time().rand(10,100),
		                    'email' => $user[0]['email'],
		                    'logged' => TRUE
		                );
		           // }
		            $this->session->set_userdata($session);
		            $email = $this->session->userdata('email');
		            $data['details'] = $this->Login_model->check_user('admin',array('email'=>$email));
		            /*$result['status'] = 'success';
		            $result['message'] = 'Yeah! You have successfully logged in.';
		            $result['redirect_url'] = base_url('/dashboard');*/
		            $responce = array(
		              'status' => 'success',
		              'message'  => 'Yeah! You have successfully logged in.',
		              'redirect_url'  => base_url('Welcome'),
		              
		              );
		        
		        }else {
		       
		             $responce = array(
		              'status' => 'error',
		              'message'  => 'Whoops! Incorrect Email & Password. Please try again',
		              
		              );
		        }

		    }
		   /* $this->output->set_content_type('application/json');
		    $this->output->set_output(json_encode($result));
		    $string = $this->output->get_output();
		    echo $string;
		    exit();*/
		    echo json_encode($responce);

	}

	function logout()
	{
		     $this->session->sess_destroy();
             echo "OK";
	}
	


    
	
}
