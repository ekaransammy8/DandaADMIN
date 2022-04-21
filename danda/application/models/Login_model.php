<?php
class Login_model extends CI_Model 
{

    function __construct()
    {
        parent::__construct(); 
        
    }
    
   public function checkUser($checkUser)
    {  
        $result=array();
        $qry="select * from admin where email='".$checkUser['email']."' AND password='".$checkUser['pass']."'";
        $query_driver = $this->db->query($qry,true);
        $result = $query_driver->result();
       // print_r($this->db->last_query());die;
        return $result;
   // print_r($result) ;
    //   die;
            
    }

    public function check_user($table,$where)
    {
    	 $query = $this->db->get_where($table, $where);
        return $query->result_array();  
        //return $this->db->last_query();  
    }

    public function change_pass($email,$pass)
    {
       

        //$result=array();
        //$data=array('password'=>$pass);
        $this->db->set('password',$pass);
        $this->db->where('username',$email);
       $result= $this->db->update('register');
        
        /*$this->db->set('password',$pass);
       $this->db->where('email', $email);
       $this->db->update('register');
       $result =  $this->db->affected_rows(); */
       print_r($result) ;
       die;
    }
    public function get_record_by_id($table,$data)
    {
        $query = $this->db->get_where($table, $data);
        $res=$query->result_array();  
        return $res;  
    }

    public function get_single_record_by_id($table,$data) //get single row data
    {
        $query = $this->db->get_where($table, $data);
        $res=$query->row_array();  
        return $res;  
    }


    public function update_record_by_id($table, $data, $where)
    {
        $query = $this->db->update($table, $data, $where);
       // print_r($this->db->last_query());
        return 1;    
    } 

    public function update_record($table, $data) //update all rows
    {
        $query = $this->db->update($table, $data);
       // print_r($this->db->last_query());
        return 1;    
    } 
    public function getrecord($table)  //general function for get one row data
    {
       
        $query = $this->db->get($table);
        $result = $query->row_array();
      //  print_r($this->db->last_query());die;
        return $result;
    }

    public function getAllData($table) 
    {
        $this->db->order_by('id', 'DESC');
        $query = $this->db->get($table);
        $result = $query->result_array();
    //print_r($this->db->last_query());die;
        return $result;
    }

    public function playlist($table)
    {
        $this->db->get_where($table, array('name!=' => ''));
        $result = $query->result_array();
      // print_r($this->db->last_query());die;
        return $result;
    
    }
    public function insertdata($table,$data) //general function for insert
    {   

            $query = $this->db->insert($table,$data);             
            $res=$this->db->insert_id();
            //print_r($this->db->last_query());die;
            return $res;

    }

    public function joins()
    {
        $this->db->select("com.*,p.name");
        $this->db->from('commercial AS com');
        $this->db->join('playlists as p','p.id = com.playlist_id');
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    public function get_itemList($value='')
    {
        $this->db->select("itm.*,b.brand_name");
        $this->db->from('items AS itm');
        $this->db->join('brands as b','b.id = itm.brand_id');
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }


    public function fileUpload($image_name,$path,$field_name,$filetype)
    {
      //print_r("'$field_name'"); die;
      $allowed_types=($filetype=='video/mp4')?'mp4|mp3|wma|gif':'gif|jpg|png|jpeg|png';
       if(!file_exists($path)) 
      {
        mkdir($path, 0755, true);
      }
        $config['encrypt_name'] = TRUE;
        $config['upload_path']   = $path;
        $config['allowed_types'] = $allowed_types;
        $config['file_name']     = $image_name;
        //$config['file_name']     = $image_name.'-'.time();
        
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
       if ($this->upload->do_upload($field_name))
        {
          $resdata = $this->upload->data();
          $image = $resdata['file_name'];
         
          
        } else{
         $image=array('error' => $this->upload->display_errors());
        }

         return $image;
    }

    public function deleteData($table,$where)
    {
      $result= $this->db->delete($table, $where); 
      return $result;
    }
}
?>
