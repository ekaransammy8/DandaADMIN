<footer class="main-footer">
    <strong>Copyright &copy; 2014-2019</strong>
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
     <!--  <b>Version</b> 3.0.0-rc.3 -->
    </div>
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- jQuery -->

<script src="<?php echo base_url('assets/plugins/jquery/jquery.min.js');?>"></script>
<!-- jQuery UI 1.11.4 -->
<script src="<?php echo base_url('assets/plugins/jquery-ui/jquery-ui.min.js');?>" type="text/javascript"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button)
</script>
<!-- Bootstrap 4 -->

<script src="<?php echo base_url('assets/plugins/bootstrap/js/bootstrap.bundle.min.js');?>" type="text/javascript"></script>
<!-- ChartJS -->

<script src="<?php echo base_url('assets/plugins/chart.js/Chart.min.js');?>" type="text/javascript"></script>
<!-- Sparkline -->

<script src="<?php echo base_url('assets/plugins/sparklines/sparkline.js');?>" type="text/javascript"></script>
<!-- JQVMap -->

<script src="<?php echo base_url('assets/plugins/jquery-knob/jquery.knob.min.js');?>" type="text/javascript"></script>
<!-- daterangepicker -->

<script src="<?php echo base_url('assets/plugins/moment/moment.min.js');?>" type="text/javascript"></script>

<script src="<?php echo base_url('assets/plugins/daterangepicker/daterangepicker.js');?>" type="text/javascript"></script>
<!-- Tempusdominus Bootstrap 4 -->

<script src="<?php echo base_url('assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js');?>" type="text/javascript"></script>
<!-- Summernote -->

<script src="<?php echo base_url('assets/plugins/summernote/summernote-bs4.min.js');?>" type="text/javascript"></script>
<!-- overlayScrollbars -->

<script src="<?php echo base_url('assets/plugins/datatables/jquery.dataTables.js');?>" type="text/javascript"></script>
<script src="<?php echo base_url('assets/plugins/datatables-bs4/js/dataTables.bootstrap4.js');?>" type="text/javascript"></script>
<!-- datatable -->





<script src="<?php echo base_url('assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js');?>" type="text/javascript"></script>
<!-- AdminLTE App -->

<script src="<?php echo base_url('assets/dist/js/adminlte.js');?>" type="text/javascript"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->

<script src="<?php echo base_url('assets/dist/js/pages/dashboard.js');?>" type="text/javascript"></script>
<!-- AdminLTE for demo purposes -->

<script src="<?php echo base_url('assets/dist/js/demo.js');?>" type="text/javascript"></script>
<!--sweet alert--->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
 
<!---toogle button js-->
<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script> 
<!-- DATATABLE  -->
<script>
  $(function () {
    $("#example1").DataTable();
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false,
    });
  });
</script>
<!--END DATATABLE  -->
<script type="text/javascript">
  function logout(){
      $.ajax({
        type: "POST",
        url: "<?php echo base_url();?>Login/logout",
        cache: false,
        success: function(response)
        {     
          //alert(response);
          if( response == "OK" ) {
            //window.location.href = "https://traala.com/cabscout/dashboard/Login/";
            window.location.href = "<?php echo base_url();?>";
          }
        }
      });
    }

//image preview code    
function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
               $(".preview").css("display","block");
                $('#blah').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    $("#customFile").change(function(){
        readURL(this);
    });

//add blog(article data )
    $('#add_blog_form').submit(function(e){
     e.preventDefault(); 
     $('#submit').html('Please Wait <i class="fa fa-circle-o-notch fa-spin" style="font-size: 14px;"></i>');
         $.ajax({
             url:'<?php echo base_url();?>Welcome/add_blog_data',
             type:"post",
             data:new FormData(this),
             processData:false,
             contentType:false,
             cache:false,
             async:false,
             dataType:'json',
              success: function(data){
                  console.log(data);
                  if(data=="True")
                  {
                    swal("Good job!", "Blog added!", "success");


                  }else{
                    swal("Oops!", "Something went wrong!", "error");
                  }

                   setTimeout(function(){// wait for 5 secs(2)
                       location.reload(); // then reload the page.(3)
                 }, 5000); 
           },error:function (data) {
             console.log(data);
           }

         });
         $('#add_blog_form').reset();
         
    }); 


    //show hide playlist based on radio button selection
      $(function() {
    $('input[name="radio1"]').on('click', function() {
     // alert($(this).val());
        if ($(this).val() == '1') {
            $('#select_playlist').show();
      
        }
        else {
            $('#select_playlist').hide();
        }

        if ($(this).val() == '2') {
            $('#add_playlist').show();
            
        }
        else {
            $('#add_playlist').hide();
        }

    });
});


    //add commercial(adds data )
    $('#addComm').submit(function(e){
     e.preventDefault(); 

  

     $('#submit').html('Please Wait <i class="fa fa-circle-o-notch fa-spin" style="font-size: 14px;"></i>');
         $.ajax({
             url:'<?php echo base_url();?>Welcome/add_comm_data',
             type:"post",
             data:new FormData(this),
             processData:false,
             contentType:false,
             cache:false,
             async:false,
             dataType:'json',
              success: function(data){
                  console.log(data);
                  if(data=="True")
                  {
                    swal("Good job!", "Blog added!", "success");


                  }else{
                    swal("Oops!", "Something went wrong!", "error");
                  }

                   setTimeout(function(){// wait for 5 secs(2)
                       location.reload(); // then reload the page.(3)
                 }, 5000); 
           },error:function (data) {
             console.log(data);
           }

         });
         $('#addComm').reset();
         
    }); 


    /*$('.toggle_class').change(function() {
    
        var status = $(this).prop('checked') == true ? 0 : 1; 

        alert(status);
        var blog_id = $(this).data('id');
         //alert(blog_id); 
         
        $.ajax({
            type: "Post",
            dataType: "json",
            url: '<?php echo base_url()?>Welcome/changeStatus',
            data: {'status': status, 'blog_id': blog_id},
            success: function(data){
              console.log(data.status);
              if(data.status==1)
              {
                 $(this).bootstrapToggle('off');
                //$("#activeSwitch").prop("checked", false);
                

              }else{
                 $(this).bootstrapToggle('on');
              }

               //location.reload();
             
              
             
              //location.reload();
            },error:function (data) {
              console.log(data);
            }
        });
    });*/
 


    
      $('input[name=toggle]').change(function(){
        var mode= $(this).prop('checked');
        //alert(mode);
        var data_id= $(this).data('id');
        var id= $(this).attr('id');
        //alert(id);
        $.ajax({
          type:'POST',
          dataType:'JSON',
          url:'<?php echo base_url()?>Welcome/do_switch',
          data:{mode:mode,id:id,data_id:data_id},
          success:function(data)
          { 
            console.log(data.success);
            if(data.success=='Enabled')
            {
              swal("Good job!", "Article Published!!", "success");
            }else{
               swal("Good job!", "Article Deleted!!", "success");
            }
            
          },error:function (data) {
              console.log(data);
            }
        });
      });

      function insertCamName(cam_name,mode)
      {
         // Send the data using post
         var url='<?php echo base_url()?>Welcome/go_live';
         var posting = $.post( url, { s: cam_name } );
          // Put the results in a div
          posting.done(function( data ) {
            console.log("cam namemmmm",data);
             if(mode == true){
               $('.live').css('display', 'inline-block');
              }else{
                 $('.live').hide();
              }
              $('#cam').val('');


          });
      }

      $('input[name=toggle1]').change(function(){
        var mode= $(this).prop('checked');
        if (mode==true) {
           $('#server_msg_modal').modal('show');
            $('#cam1').click(function(){
              let cam_name=$('#cam').val();
              if (cam_name=='') {
                alert("Please enter the camera name")
                return
              }/*else{
                insertCamName(cam_name,mode);
              }*/
             $('.live').css('display', 'inline-block');

            });
             

        }else{
          $('.live').hide();
        }
       
        
        /*var mode= $(this).prop('checked');
        //alert(mode);
        if(mode == true){
           $('.live').css('display', 'inline-block');
          }else{
             $('.live').hide();
          }*/
        
         /* $.ajax({
                  type:'POST',
                  dataType:'JSON',
                  url:'<?php echo base_url()?>Welcome/go_live',
                  data:{mode:mode},
                  success:function(data)
                  { 
                    //console.log(data);
                    if(data.$success=='Enabled')
                    {
                      swal("Good job!", "You are live now!!", "success");
                    }else{
                       swal("Good job!", "You goes Offline!!", "success");
                    }

                     setTimeout(function(){// wait for 5 secs(2)
                                location.reload(); // then reload the page.(3)
                              }, 3000);
                    
                  },error:function (data) {
                      console.log(data);
                    }
              });*/
      });


      $('input[name=player]').change(function(){

        if( $(this).is(":checked") ){ // check if the radio is checked
            var mode = $(this).val(); // retrieve the value
           // alert(mode);
            $.ajax({
              type:'POST',
              dataType:'JSON',
              url:'<?php echo base_url()?>Welcome/change_player',
              data:{mode:mode},
              success:function(data)
              { 
                console.log(data);
                if(data.$success=='Enabled')
                {
                  swal("Good job!", "Player  setup!!", "success");
                }
                
                 
                
              },error:function (data) {
                  console.log(data);
                  
                }
            });
         }
      });


   //delete commercial
function ConfirmsDialogs(cat_id)
{
   //alert(cat_id);
   swal({
           title: "Are you sure?",
           text: "Once deleted, you will not be able to recover this!",
           icon: "warning",
           buttons: true,
           dangerMode: true,
         })
         .then((willDelete) => {
           if (willDelete) {
             var dataString = 'service_id='+ cat_id;
             $.ajax({
               type: "POST",
                           url: "<?php echo base_url();?>Welcome/delList",
                           data: dataString,
                           cache: false,
                           dataType:'json',
                           success: function(response)
                           {
                              console.log(response);
                              if(response==1)
                              {
                                 swal("Poof! Video has been deleted!", {
                                  icon: "success",
                                  });
                                 location.reload();
                              }

                           },error:function(response){
                              console.log(response);
                           }
             });


        } else {
          swal("Your Video is safe!");
        }
      });
 }

  $('input[name=show_item]').change(function(){
    var id=document.getElementById('myId').value;
    let val=$(this).val();
        $.post( "<?php echo base_url();?>Welcome/showItems", { valu: val,id:id})
            .done(function( data ) {
              console.log(data);
            if (val==1) {
              swal("Poof! Items showing!", {
                      icon: "success",
                      });

            }else{
              swal("Poof! Items hidden!", {
                      icon: "success",
                      });
        
            }
             // alert( "Data Loaded: " + data );
            // alert(val);
        });
   // alert(val);
  });


//function to show camera on front end by changing status
  function myFunction(cat_id)
{
 // alert(cat_id);
   swal({
           title: "Camera",
           text: "Want to Show on frontend?",
           icon: "warning",
           buttons: true,
           dangerMode: true,
         })
         .then((willDelete) => {
           if (willDelete) {
             var dataString = 'live_id='+ cat_id;
             $.ajax({
               type: "POST",
               url: "<?php echo base_url();?>Welcome/showFront",
               data: dataString,
               cache: false,
               dataType:'json',
               success: function(response)
               {
                  console.log(response);
                  if(response.success=='Enabled')
                  {
                     swal("Poof! Camera showing!", {
                      icon: "success",
                      });
                      setTimeout(function(){// wait for 5 secs(2)
                                location.reload(); // then reload the page.(3)
                              }, 3000);
                  }

               },error:function(response){
                  console.log("data",response.status);
              
               }
            });
        } else {
          swal("Default Showing!");
        }
      });
 }
    

function itemDelete(cat_id)
{
 // alert(cat_id);
   swal({
           title: "Camera",
           text: "Want to delete this item ?",
           icon: "warning",
           buttons: true,
           dangerMode: true,
         })
         .then((willDelete) => {
           if (willDelete) {
             var dataString = 'item_id='+ cat_id;
             $.ajax({
               type: "POST",
               url: "<?php echo base_url();?>Welcome/deleteItem",
               data: dataString,
               cache: false,
               dataType:'json',
               success: function(response)
               {
                  console.log(response);
                  if(response==true)
                  {
                     swal("Poof! Item Deleted", {
                      icon: "success",
                      });
                      setTimeout(function(){// wait for 5 secs(2)
                                location.reload(); // then reload the page.(3)
                              }, 3000);
                  }

               },error:function(response){
                  console.log("data",response);
              
               }
            });
        } else {
          swal("Default Showing!");
        }
      });
 }
 
</script>





</body>
</html>