<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller 
{

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

	public function  __construct()
    {
		 
		parent::__construct();
      
		$this->load->model('Login_model');
		$this->load->library('form_validation');
		$this->load->helper('form');
		$this->load->helper('url');	
		$this->load->library("session");
		 if($this->session->userdata('logged')!=TRUE) 
		{  
				
				redirect(base_url());

		}
		
    }
	public function index()
	{
		if(isset($_SESSION['email']) && !empty($_SESSION['email']))
		{
			$this->load->view('layout/header');
			$this->load->view('add_link');
			$this->load->view('layout/footer');
		}
		else
		{
			
			$this->load->view('login');
			
		}
		
	}

	
	public function add_link()
	{
		
			$this->load->view('layout/header');
			$this->load->view('add_link');
			$this->load->view('layout/footer');
	}





	function get_youtube_id_from_url($url)
   {
    if (stristr($url,'youtu.be/'))
        {preg_match('/(https:|http:|)(\/\/www\.|\/\/|)(.*?)\/(.{11})/i', $url, $final_ID); return $final_ID[4]; }
    else 
        {@preg_match('/(https:|http:|):(\/\/www\.|\/\/|)(.*?)\/(embed\/|watch.*?v=|)([a-z_A-Z0-9\-]{11})/i', $url, $IDD); return $IDD[5]; }
    }
	public function add_link_data()
	{
		
		$link=$this->input->post('link');
        $exp = explode("/", $link);
        $video_id= $this->get_youtube_id_from_url($link);
        
		
		$data=array('links' => $video_id); 
		

		$res=$this->Login_model->update_record_by_id('link_upload', $data, array('id'=>'1'));
		if($res)
		{
			$this->session->set_flashdata('success_msg', 'Link Added successfully');
        	$this->load->view('layout/header');
			$this->load->view('add_link');
			$this->load->view('layout/footer');
		}
		else
		{
			$this->session->set_flashdata('error_msg', 'Something is wrong.');
        	$this->load->view('layout/header');
			$this->load->view('add_link');
			$this->load->view('layout/footer');
		}
		 // echo json_encode($res);die; 	 

	}

	
	function add_artist()
	{
		$this->load->view('layout/header');
		$this->load->view('add_artist');
		$this->load->view('layout/footer');
	}

	public function addartist()
    {
    	
    	$img1=$_FILES['img1']['name'];
    	$img2=$_FILES['img2']['name'];
    	$img3=$_FILES['img3']['name'];
    	if (isset($img1)) 
		{
			$target_dir=FCPATH.'assets/images/';
			if(!is_dir($target_dir)) 
		    {
		        mkdir($target_dir, 0775,true); //create directory
		    }
		   
	        $config['upload_path']          = './assets/images/';
            $config['allowed_types']        = 'gif|jpg|png';
            $config['max_size']             = 100;
            $config['max_width']            = 1024;
            $config['max_height']           = 768;

            $this->load->library('upload', $config);

            if ($this->upload->do_upload('img1'))
            {
            	$data = array('upload_data' => $this->upload->data());
                $img1= $img1;
            }
		}
		if (isset($img2)) 
		{
			$target_dir=FCPATH.'assets/images/';
			if(!is_dir($target_dir)) 
		    {
		        mkdir($target_dir, 0775,true); //create directory
		    }
		   
	        $config['upload_path']          = './assets/images/';
            $config['allowed_types']        = 'gif|jpg|png';
            $config['max_size']             = 100;
            $config['max_width']            = 1024;
            $config['max_height']           = 768;

            $this->load->library('upload', $config);

            if ($this->upload->do_upload('img2'))
            {
            	$data = array('upload_data' => $this->upload->data());
                $img2= $img2;
            }
		}
		if (isset($img3)) 
		{
			$target_dir=FCPATH.'assets/images/';
			if(!is_dir($target_dir)) 
		    {
		        mkdir($target_dir, 0775,true); //create directory
		    }
		   
	        $config['upload_path']          = './assets/images/';
            $config['allowed_types']        = 'gif|jpg|png';
            $config['max_size']             = 100;
            $config['max_width']            = 1024;
            $config['max_height']           = 768;

            $this->load->library('upload', $config);

            if ($this->upload->do_upload('img3'))
            {
            	$data = array('upload_data' => $this->upload->data());
                $img3= $img3;
            }
		}
    	
    	$result=$this->Login_model->getrecord('add_artist') ;
  

    	if(!empty($result))
    	{
    		$data = array(
									
						'h1' => $this->input->post('h1'),
						'h2' => $this->input->post('h2'),
						'h3' => $this->input->post('h3'),
						'h4' => $this->input->post('h4'),
						't_reach' => $this->input->post('t_reach'),
						't_imprs' => $this->input->post('t_imprs'),
						't_view' => $this->input->post('t_view'),
						't_highv' => $this->input->post('t_highv'),
						'h5' => $this->input->post('h5'),
						'h6' => $this->input->post('h6'),
						'h7' => $this->input->post('h7'),
						'h8' => $this->input->post('h8'),
						'i_reach' => $this->input->post('i_reach'),
						'i_imprs' => $this->input->post('i_imprs'),
						'i_view' => $this->input->post('i_view'),
						'i_highv' => $this->input->post('i_highv'),
						'h9' => $this->input->post('h9'),
						'h10' => $this->input->post('h10'),
						'followers' => $this->input->post('followers'),
						'avg_view' => $this->input->post('avg_view'),
						'img1'=>!empty($img1)? $img1:$result['img1'],
						'img2'=>!empty($img2)? $img2:$result['img2'],
						'img3'=>!empty($img3)? $img3:$result['img3']
						
						
						
					);	
    		
    		$result=$this->Login_model->update_record_by_id('add_artist', $data, array('id'=>'1'));
    		$this->session->set_flashdata('success', array('message' => 'Data updated successfully','class' => 'success'));
	    	redirect($_SERVER['HTTP_REFERER']);
	    	$this->load->view('layout/footer');
    	}
	    else
	    {
	    	$data = array(
						'h1' => $this->input->post('h1'),
						'h2' => $this->input->post('h2'),
						'h3' => $this->input->post('h3'),
						'h4' => $this->input->post('h4'),
						't_reach' => $this->input->post('t_reach'),
						't_imprs' => $this->input->post('t_imprs'),
						't_view' => $this->input->post('t_view'),
						't_highv' => $this->input->post('t_highv'),
						'h5' => $this->input->post('h5'),
						'h6' => $this->input->post('h6'),
						'h7' => $this->input->post('h7'),
						'h8' => $this->input->post('h8'),
						'i_reach' => $this->input->post('i_reach'),
						'i_imprs' => $this->input->post('i_imprs'),
						'i_view' => $this->input->post('i_view'),
						'i_highv' => $this->input->post('i_highv'),
						'h9' => $this->input->post('h9'),
						'h10' => $this->input->post('h10'),
						'followers' => $this->input->post('followers'),
						'avg_view' => $this->input->post('avg_view'),
						'img1'=>$img1,
						'img2'=>$img2,
						'img3'=>$img3
									
					);	
	    	$res=$this->Login_model->insertdata('add_artist',$data);
	    	if(!empty($res))
	    	{

	    		$this->session->set_flashdata('success', array('message' => 'Data created successfully','class' => 'success'));
	    		redirect($_SERVER['HTTP_REFERER']);
	    	}
	    	else
	    	{
	    		$this->session->set_flashdata('error', array('message' => 'Error','class' => 'error'));
	    		redirect($_SERVER['HTTP_REFERER']);
	    	}
    	}
    	

    }

    function fileupload($img_name)
    {

    	if (isset($img_name)) 
		{
			$target_dir=FCPATH.'assets/images/';
		    // print_r($target_dir);
			$nn=$img_name;
			//print_r($nn);die;

			if(!is_dir($target_dir)) 
		    {
		        mkdir($target_dir, 0775,true); //create directory
		    }
		   
	        $config['upload_path']          = './assets/images/';
	        $config['file_name'] = $img_name;

            $config['allowed_types']        = 'gif|jpg|png';
            $config['max_size']             = 100;
            $config['max_width']            = 1024;
            $config['max_height']           = 768;

            $this->load->library('upload', $config);

            if ($this->upload->do_upload('img_name'))
            {
            	$data = array('upload_data' => $this->upload->data());
                print_r('ssssssssssssss');
                
                return $img_name;
               

                    //$this->load->view('upload_form', $error);
            }
            else
            {
            	 $error = array('error' => $this->upload->display_errors());
                    print_r($nn);
                    print_r($error);
            	//print_r('successssssss');
                

                   // $this->load->view('upload_success', $data);
            }

			/*$config['upload_path'] =$target_dir;
			$config['allowed_types'] = 'jpg|png|jpeg';
			$config['file_name'] = $img_name;

			$this->load->library('upload', $config);
			$this->upload->initialize($config);
			if ($this->upload->do_upload('img_name'))
			{
				$resdata = $this->upload->data(); 
			}*/
			
		}
    }

    public function addBlog($value='')
    {
    	$this->load->view('layout/header');
		$this->load->view('addBlog');
		$this->load->view('layout/footer');
    }

    public function add_blog_data($value='')
    {

    	
    	
         //echo "button pressed";
	    	if (isset($_FILES['blog_image']['name']) && $_FILES['blog_image']['name'] != "") 
				        {	
				        	$fileType=$_FILES["blog_image"]["type"];
						    $upload_path='./assets/blog/';
	                        $image_name=$_FILES['blog_image']['name'];
	                        $blog_image=$this->Login_model->fileUpload($image_name,$upload_path,'blog_image',$fileType);
				            //$image_path= base_url().'/assets/blog/'.$noti_image;
				        }else{
				        	$blog_image='';
				        }
	    	$title=$this->input->post('title');
	    	$des=$this->input->post('des');
	       
	        
			
			$data=array('title' => $title,'description'=>$des,'image'=>$blog_image); 
			

			$res=$this->Login_model->insertdata('blogs', $data);
			if($res)
			{
				$res="True";
			}
			else
			{
				$res="False";
			}
			echo json_encode($res);

		
    }

    


    public function blogList()
    {
        $data['blogs']=$this->Login_model->getAllData('blogs');
    	$this->load->view('layout/header');
		$this->load->view('blogList',$data);
		$this->load->view('layout/footer');
    	
    }

     public function cameraList()
    {
        $data['get_status']=$this->Login_model->get_record_by_id('admin_live',array('status'=>'1'));
    	$this->load->view('layout/header');
		$this->load->view('cameraList',$data);
		$this->load->view('layout/footer');
    	
    }

     public function changeStatus()
    {
    	
    	 $blog_id = $this->input->post('blog_id');
    	 $status = $this->input->post('status');
        $change= $this->Login_model->update_record_by_id('blogs',array('status'=>$status),array('id'=>$blog_id));

        $get_status=$this->Login_model->get_single_record_by_id('blogs',array('id'=>$blog_id));

        echo json_encode($get_status);
       // echo json_encode(['success'=>'Status change successfully.']);

      /*  $user = User::find($request->user_id);
        $user->status = $request->status;
        $user->save();
  
        return response()->json(['success'=>'Status change successfully.']);*/
    }

    public function do_switch()
    {
    	$mode=$this->input->post('mode');
		$pid=$this->input->post('data_id');
		$id=$this->input->post('id');
		$table=($id=='com')?'commercial':'blogs';
		if ($mode=='true') //mode is true when button is enabled 
		{
		  $str=$this->Login_model->update_record_by_id($table,array('status'=>'0'),array('id'=>$pid));
		    $message='Article Published!!';
		    $success='Enabled';
		    echo json_encode(array('message'=>$message,'success'=>$success));
		    //echo json_encode($str);
		}
		else
		{
		  $str=$this->Login_model->update_record_by_id($table,array('status'=>'1'),array('id'=>$pid));
		    $message='Article Deleted!!';
		    $success='Disabled';
		    echo json_encode(array('message'=>$message,'success'=>$success));
		    // echo json_encode($str);
		} 
    }

    public function showFront()
    {
    	$live_id=$this->input->post('live_id');
		  $str=$this->Login_model->update_record_by_id('admin_live',array('is_show'=>'1'),array('id'=>$live_id));
		  $str=$this->Login_model->update_record_by_id('admin_live',array('is_show'=>'0'),array('id!='=>$live_id));
		 
		    $message='Camera showing';
		    $success='Enabled';
		    echo json_encode(array('message'=>$message,'success'=>$success));
		    //echo json_encode($str);
    }




    public function addCom()
	{
		    $data['playlists']=$this->Login_model->playlist('playlists');
		    //print_r($data); die;
			$this->load->view('layout/header');
			$this->load->view('addCom',$data);
			$this->load->view('layout/footer');
	}

	 public function add_comm_data($value='')
    {

    	
    	$name=$this->input->post('playlist');
    	$optn_playlist=$this->input->post('optn_playlist');

    	if($optn_playlist)
    	{
    		 $res1=$optn_playlist;
    	}else{
    		  //add playlist name
             $res1=$this->Login_model->insertdata('playlists', array('name'=>$name));
    	}

    	$title=$this->input->post('title');

         //echo "button pressed";
	    	if (isset($_FILES['comm_image']['name']) && $_FILES['comm_image']['name'] != "") 
				        {	
				        	
				        	$fileType=$_FILES["comm_image"]["type"];
						    $upload_path='./assets/commercial/';
	                        $image_name=$_FILES['comm_image']['name'];
	                        $blog_image=$this->Login_model->fileUpload($image_name,$upload_path,'comm_image',$fileType);
				            //$image_path= base_url().'/assets/blog/'.$noti_image;
				        }else{
				        	$blog_image='';
				        }
	    	if (isset($_FILES['comm_thumb']['name']) && $_FILES['comm_thumb']['name'] != "") 
				        {	
				        	
				        	$fileType=$_FILES["comm_thumb"]["type"];
						    $upload_path='./assets/commercial/thumb/';
	                        $image_name=$_FILES['comm_thumb']['name'];
	                        $thumb=$this->Login_model->fileUpload($image_name,$upload_path,'comm_thumb',$fileType);
				            //$image_path= base_url().'/assets/blog/'.$noti_image;
				        }else{
				        	$thumb='';
				        }
			
			$data=array('image'=>$blog_image,'playlist_id'=>$res1,'title'=>$title,'thumbnail'=>$thumb); 
			

			$res=$this->Login_model->insertdata('commercial', $data);
			if($res)
			{
				$res="True";
			}
			else
			{
				$res="False";
			}
			echo json_encode($res);

		
    }

     public function comList()
    {
        $data['blogs']=$this->Login_model->joins();
    	$this->load->view('layout/header');
		$this->load->view('comList',$data);
		$this->load->view('layout/footer');
    	
    }

     public function delList()
    {
      $pay_id=$this->input->post('service_id');
      $record = $this->Login_model->deleteData('commercial',array('id'=>$pay_id));
     echo json_encode($record);
    }

    public function player_setup($value='')
    {
    	
    	$this->load->view('layout/header');
		$this->load->view('playerSetup');
		$this->load->view('layout/footer');
    }

    public function change_player($value='')
    {
    	$mode=$this->input->post('mode');
		 
		  $str=$this->Login_model->update_record_by_id('link_upload',array('player'=>$mode),array('id'=>'1'));
		    $message='Player updated!!';
		    $success='Enabled';
		    echo json_encode(array('message'=>$message,'$success'=>$success));
		    //echo json_encode($str);
		
    }

     function appSettings()
	{
		$this->load->view('layout/header');
		$data=$this->Login_model->get_single_record_by_id('app_settings',array('id'=>'1'));
		$this->load->view('settings',['data'=>$data]);
		$this->load->view('layout/footer');
	}

	public function updateSettings()
	{
		$android=$this->input->post('android');
		$ios=$this->input->post('ios');
		$web=$this->input->post('web');
		$apiKey=$this->input->post('api');
		$data=array('androidApiKey' => $android,'iosApiKey'=>$ios,'webApiKey'=>$web,'ApiKey'=>$apiKey); 
		$res=$this->Login_model->update_record('app_settings', $data);
		redirect('Welcome/appSettings');
	}

    public function goLive()
    {
    	//$get_status=$this->Login_model->get_single_record_by_id('admin',array('id'=>$this->session->userdata('session_id')));
    	$get_status=$this->Login_model->get_single_record_by_id('app_settings',array('id'=>'1'));
    	$this->load->view('layout/header');
		$this->load->view('go_live',['getStatus'=>$get_status]);
		$this->load->view('layout/footer');
    }

    public function go_live()
    {
        $user_id=$this->session->userdata('uniq_session_id');
    	$cam_name=$this->input->post('s');//camera name get
    	$data=array('user_id'=>$user_id,'camera_name'=>$cam_name);
        $res=$this->Login_model->insertdata('admin_live',$data);
    	 echo json_encode($res);
    	/*$mode=$this->input->post('mode');
    	$user_id=$this->session->userdata('session_id');
		if ($mode=='true') //mode is true when button is enabled 
		{
		   $str=$this->Login_model->update_record_by_id('admin',array('is_live'=>'1'),array('id'=>$user_id));
		    $message='You are live now!';
		    $success='Enabled';
		    echo json_encode(array('message'=>$message,'$success'=>$success));
		    //echo json_encode($str);
		}
		else
		{
		   $str=$this->Login_model->update_record_by_id('admin',array('is_live'=>'0'),array('id'=>$user_id));
		    $message='You goes Offline!!';
		    $success='Disabled';
		    echo json_encode(array('message'=>$message,'success'=>$success));
		    // echo json_encode($str);
		} */
    	
	    
 			
    }

    public function test()
    {
    	$broadcast_id=$this->input->post('broadcastID');
    	$cam_name=$this->input->post('cam_name');
        $get_status=$this->Login_model->get_single_record_by_id('app_settings',array('id'=>'1'));
    	//$user_id=$this->session->userdata('uniq_session_id');
    	$ch = curl_init();
 
	     // set url
	     curl_setopt($ch, CURLOPT_URL, "https://api.bambuser.com/broadcasts/$broadcast_id");

	     curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Accept: application/vnd.bambuser.v1+json','Authorization:Bearer Dw6C3DgVBhE9MaUkYi1YMU',));
	    // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Accept: application/vnd.bambuser.v1+json','Authorization:Bearer 3baavrcyur5l3cywy2ofo256y',));

	     //return the transfer as a string
	     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	     // $output contains the output string
	    $output = curl_exec($ch);
	 	if($output)
	 	{

	 		$user_id=$this->session->userdata('uniq_session_id');

			$json1=json_decode($output);
			$b_id=$json1->id;
			$status=$json1->type; //status
			$status=($status=='live')?'1':'0';
			$resourceUri=$json1->resourceUri;
			$encodeUrl = urlencode($resourceUri);
			$url="https://dist.bambuser.net/player/?resourceUri=".$encodeUrl."&showViewerCount=1";

			$data=array('user_id'=>$user_id,'status'=>$status,'broadcast_id'=>$b_id,'b_url'=>$url,'camera_name'=>$cam_name);
            $res=$this->Login_model->insertdata('admin_live',$data);
            echo json_encode($b_id);

           /* $get_userID=$this->Login_model->get_single_record_by_id('admin_live',array('user_id'=>$user_id));
        	if ($get_userID) {

        		$data=array('status'=>$status,'broadcast_id'=>$b_id,'b_url'=>$url);
				$where=array('user_id'=>$user_id,'broadcast_id'=>$b_id);
				$get_status=$this->Login_model->get_single_record_by_id('admin_live',array('user_id'=>$user_id,'broadcast_id'=>$b_id));
				if(!empty($get_status))
				{
					//update record
	              $res=$this->Login_model->update_record_by_id('admin_live',$data,$where);
	                
				}else{
					//insert
					$where2=array('user_id'=>$user_id);
					$res=$this->Login_model->update_record_by_id('admin_live',$data,$where2);
				}

              echo json_encode($res);
        		
        	}*/

			
		

		}


    }

    public function brodcastStop()
    {
    	$ch = curl_init();
 
	     // set url
	     curl_setopt($ch, CURLOPT_URL, "https://api.bambuser.com/broadcasts?limit=1&titleContains=");

	     curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Accept: application/vnd.bambuser.v1+json','Authorization:Bearer Dw6C3DgVBhE9MaUkYi1YMU',));
	    // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Accept: application/vnd.bambuser.v1+json','Authorization:Bearer 3baavrcyur5l3cywy2ofo256y',));

	     //return the transfer as a string
	     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	     // $output contains the output string
	    $output = curl_exec($ch);
	 	if($output)
	 	{

	 		$user_id=$this->session->userdata('uniq_session_id');

			$json1=json_decode($output);
			$b_id=$json1->results[0]->id;
			$status=$json1->results[0]->type; //status
			$status=($status=='live')?'1':'0';
			$resourceUri=$json1->results[0]->resourceUri;
			$encodeUrl = urlencode($resourceUri);
			$url="https://dist.bambuser.net/player/?resourceUri=".$encodeUrl."&showViewerCount=1";

            $where=array('broadcast_id'=>$b_id);
            $data=array('status'=>'0','broadcast_id'=>$b_id,'b_url'=>$url);
			$get_user_id=$this->Login_model->get_record_by_id('admin_live',$where);
			if ($get_user_id) {
			   $res=$this->Login_model->update_record_by_id('admin_live',$data,$where);
			  // $res="data found";
			}else{
				$res="data not found";

			}
           
		
            echo json_encode($status);


    	}
    	


    }

     public function addItem()
    {
    	$get_status=$this->Login_model->getAllData('brands');
    	$data['title']= "addItem";
    	$this->load->view('layout/header',$data);
		$this->load->view('addItem',['getStatus'=>$get_status]);
		$this->load->view('layout/footer');
    }


    public function addBrand()
    {
    	//echo "string"; die;
    	$brand=$this->input->post();
    	unset($brand['submit']);
    	$res=$this->Login_model->insertdata('brands',$brand);
    	$this->session->set_flashdata('success_msg', 'Brand added.');
    	redirect('Welcome/itemList');
    }

    public function addItemdata()
    {
    	if (isset($_FILES['item_image']['name']) && $_FILES['item_image']['name'] != "") 
        {	
        	
        	$fileType=$_FILES["item_image"]["type"];
		    $upload_path='./assets/items/';
            $image_name=$_FILES['item_image']['name'];
            $item_image=$this->Login_model->fileUpload($image_name,$upload_path,'item_image',$fileType);
            //$image_path= base_url().'/assets/blog/'.$noti_image;
        }else{
        	$item_image='';
        }
    	//echo "string"; die;
    	//$brand=$this->input->post();
    	$brand=array('title' => $this->input->post('title'),
    		        'link'=>$this->input->post('link'),
    		        'item_image'=>$item_image
    		    ); 
    	//print_r($brand); die;
    	//unset($brand['submit']);
    	$res=$this->Login_model->insertdata('items',$brand);
    	$this->session->set_flashdata('success_msg', 'Items added.');
    	redirect('Welcome/itemList');
    }


    public function showItems($value='')
    {
    	$val=$this->input->post('valu');
    	$id=$this->input->post('id');
    	$data=array('show_item' => $val); 
		$res=$this->Login_model->update_record('admin_live', $data);
		echo json_encode($val);
    }

      public function itemList()
    {
    	$get_status=$this->Login_model->getAllData('items');
    	/*print_r($get_status);die;*/
    	$data['title']= "itemList";
    	$this->load->view('layout/header',$data);
		$this->load->view('itemList',['getStatus'=>$get_status]);
		$this->load->view('layout/footer');
    }

    public function deleteItem($value='')
    {

    	$item_id=$this->input->post('item_id');
    	$get_status=$this->Login_model->deleteData('items',array('id' =>$item_id));
		 echo json_encode($get_status);
    }





   

}
