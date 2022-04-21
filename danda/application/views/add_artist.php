<?php 
   $data=$this->Login_model->getrecord('add_artist');
?>


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>General Form</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">General Form</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- left column -->
          <div class="col-md-12">
            <!-- general form elements -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Quick Example</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
             <!--  <form role="form"> -->
              <form action="<?php echo base_url('Welcome/addartist/') ?>" method="post" enctype="multipart/form-data">
              <!--   <div class="card-body col-md-6"> -->
                <div class="row">
                  <div class=" card-body  col-md-3">
                    <div class="form-group">
                      <label for="exampleInputPassword1">TikTok</label>
                       <?php echo form_input(array('name'=>'h1','id'=> 'heading1','class'=>'form-control','type'=>'text','value'=>((!empty($data['h1']) && isset($data['h1']))?$data['h1']:''))); ?>
                    </div>
                    <div class="form-group">
                       <?php echo form_input(array('name'=>'h2','id'=> 'heading2','class'=>'form-control','type'=>'text','value'=>((!empty($data['h2']) && isset($data['h2']))?$data['h2']:''))); ?>
                    </div>
                     <div class="form-group">
                        <?php echo form_input(array('name'=>'h3','id'=> 'heading3','class'=>'form-control','type'=>'text','value'=>((!empty($data['h3']) && isset($data['h3']))?$data['h3']:''))); ?>
                    </div>
                     <div class="form-group">
                        <?php echo form_input(array('name'=>'h4','id'=> 'heading4','class'=>'form-control','type'=>'text','value'=>((!empty($data['h4']) && isset($data['h4']))?$data['h4']:''))); ?>
                    </div>
                  </div>

                  <div class=" card-body  col-md-3">
                    <div class="form-group">
                      <label for="exampleInputPassword1">      </label>
                        <?php echo form_input(array('name'=>'t_reach','id'=> 't_reach','class'=>'form-control','type'=>'text','value'=>((!empty($data['t_reach']) && isset($data['t_reach']))?$data['t_reach']:''))); ?>
                    </div>
                    <div class="form-group">
                       <?php echo form_input(array('name'=>'t_imprs','id'=> 't_imprs','class'=>'form-control','type'=>'text','value'=>((!empty($data['t_imprs']) && isset($data['t_imprs']))?$data['t_imprs']:''))); ?>
                    </div>
                     <div class="form-group">
                        <?php echo form_input(array('name'=>'t_view','id'=> 't_view','class'=>'form-control','type'=>'text','value'=>((!empty($data['t_view']) && isset($data['t_view']))?$data['t_view']:''))); ?>
                    </div>
                     <div class="form-group">
                        <?php echo form_input(array('name'=>'t_highv','id'=> 't_highv','class'=>'form-control','type'=>'text','value'=>((!empty($data['t_highv']) && isset($data['t_highv']))?$data['t_highv']:''))); ?>
                    </div>
                  </div>

                  <div class=" card-body  col-md-3">
                    <div class="form-group">
                      <label for="exampleInputPassword1">Instagram</label>
                        <?php echo form_input(array('name'=>'h5','id'=> 'heading5','class'=>'form-control','type'=>'text','value'=>((!empty($data['h5']) && isset($data['h5']))?$data['h5']:''))); ?>
                    </div>
                    <div class="form-group">
                       <?php echo form_input(array('name'=>'h6','id'=> 'heading6','class'=>'form-control','type'=>'text','value'=>((!empty($data['h6']) && isset($data['h6']))?$data['h6']:''))); ?>
                    </div>
                     <div class="form-group">
                        <?php echo form_input(array('name'=>'h7','id'=> 'heading7','class'=>'form-control','type'=>'text','value'=>((!empty($data['h7']) && isset($data['h7']))?$data['h7']:''))); ?>
                    </div>
                     <div class="form-group">
                        <?php echo form_input(array('name'=>'h8','id'=> 'heading8','class'=>'form-control','type'=>'text','value'=>((!empty($data['h8']) && isset($data['h8']))?$data['h8']:''))); ?>
                    </div>
                  </div>

                  <div class=" card-body  col-md-3">
                    <div class="form-group">
                      <label for="exampleInputPassword1">      </label>
                        <?php echo form_input(array('name'=>'i_reach','id'=> 'i_reach','class'=>'form-control','type'=>'text','value'=>((!empty($data['i_reach']) && isset($data['i_reach']))?$data['i_reach']:''))); ?>
                    </div>
                    <div class="form-group">
                       <?php echo form_input(array('name'=>'i_imprs','id'=> 'i_imprs','class'=>'form-control','type'=>'text','value'=>((!empty($data['i_imprs']) && isset($data['i_imprs']))?$data['i_imprs']:''))); ?>
                    </div>
                     <div class="form-group">
                        <?php echo form_input(array('name'=>'i_view','id'=> 'i_view','class'=>'form-control','type'=>'text','value'=>((!empty($data['i_view']) && isset($data['i_view']))?$data['i_view']:''))); ?>
                    </div>
                     <div class="form-group">
                        <?php echo form_input(array('name'=>'i_highv','id'=> 'i_highv','class'=>'form-control','type'=>'text','value'=>((!empty($data['i_highv']) && isset($data['i_highv']))?$data['i_highv']:''))); ?>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class=" card-body  col-md-3">
                     <div class="form-group">
                        <?php echo form_input(array('name'=>'h9','id'=> 'h9','class'=>'form-control','type'=>'text','value'=>((!empty($data['h9']) && isset($data['h9']))?$data['h9']:''))); ?>
                    </div>
                  </div>

                  <div class=" card-body  col-md-3">
                     <div class="form-group">
                        <?php echo form_input(array('name'=>'h10','id'=> 'h10','class'=>'form-control','type'=>'text','value'=>((!empty($data['h10']) && isset($data['h10']))?$data['h10']:''))); ?>
                    </div>
                  </div>

                  <div class=" card-body  col-md-3">
                     <div class="form-group">
                        <?php echo form_input(array('name'=>'followers','id'=> 'followers','class'=>'form-control','type'=>'text','value'=>((!empty($data['followers']) && isset($data['followers']))?$data['followers']:''))); ?>
                    </div>
                  </div>
                   <div class=" card-body  col-md-3">
                     <div class="form-group">
                        <?php echo form_input(array('name'=>'avg_view','id'=> 'avg_view','class'=>'form-control','type'=>'text','value'=>((!empty($data['avg_view']) && isset($data['avg_view']))?$data['avg_view']:''))); ?>
                    </div>
                  </div>

                </div>
                <hr>
                <div class="row">
                   <div class=" card-body  col-md-4">
                    <div class="form-group">
                        <div class="gallery" >
                          <a target="_blank" href="img_5terre.jpg" >
                            <img src="<?php echo base_url('assets/images/'.$data['img1']);?>" alt="Cinque Terre" width="150" height="150">
                          </a>
                        <!--   <div class="desc">Add a description of the image here</div> -->
                        </div>
                    </div>
                  </div>

                  <div class=" card-body  col-md-4">
                    <div class="form-group">
                        <div class="gallery" >
                          <a target="_blank" href="img_5terre.jpg" >
                            <img src="<?php echo base_url('assets/images/'.$data['img2']);?>" alt="Cinque Terre" width="150" height="150">
                          </a>
                        <!--   <div class="desc">Add a description of the image here</div> -->
                        </div>
                    </div>
                  </div>

                  <div class=" card-body  col-md-4">
                    <div class="form-group">
                        <div class="gallery" >
                          <a target="_blank" href="img_5terre.jpg" >
                            <img src="<?php echo base_url('assets/images/'.$data['img3']);?>" alt="Cinque Terre" width="150" height="150">
                          </a>
                        <!--   <div class="desc">Add a description of the image here</div> -->
                        </div>
                    </div>
                  </div>

                  <div class=" card-body  col-md-4">
                    <div class="form-group">
                        <label for="exampleInputFile">File input</label>
                          <div class="input-group">
                            <div class="custom-file">
                              <input type="file" class="custom-file-input"  name="img1">
                              <label class="custom-file-label" for="img1">Choose file</label>
                            </div>
                            <!-- <div class="input-group-append">
                              <span class="input-group-text" id="">Upload</span>
                            </div> -->
                          </div>
                    </div>
                  </div>
                  <div class=" card-body  col-md-4">
                    <div class="form-group">
                        <label for="exampleInputFile">File input</label>
                          <div class="input-group">
                            <div class="custom-file">
                              <input type="file" class="custom-file-input" id="exampleInputFile" name="img2">
                              <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                            </div>
                           <!--  <div class="input-group-append">
                              <span class="input-group-text" id="">Upload</span>
                            </div> -->
                          </div>
                    </div>
                  </div>
                  <div class=" card-body  col-md-4">
                    <div class="form-group">
                        <label for="exampleInputFile">File input</label>
                          <div class="input-group">
                            <div class="custom-file">
                              <input type="file" class="custom-file-input" id="exampleInputFile" name="img3">
                              <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                            </div>
                            <!-- <div class="input-group-append">
                              <span class="input-group-text" id="">Upload</span>
                            </div> -->
                          </div>
                    </div>
                  </div>
               </div> 

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
            <!-- /.card -->

<script>
$(document).ready(function(){
  $("input").change(function(){
    alert("The text has been changed.");
  });
});
</script>