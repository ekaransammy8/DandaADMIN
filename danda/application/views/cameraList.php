
 <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
           <h2>Camera list</h2>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">CameraList</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-12">
<!--want-->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Camera List</h3>
               <div class="col-sm-6 pull-right">
                    <div class="form-group clearfix">
                      <span>Show Products?</span>
                      <div class="icheck-primary d-inline">
                        <input type="radio" id="radioPrimary1" name="show_item"  value="1">
                        
                        <label for="radioPrimary1">
                         Yes
                        </label>
                      </div>
                      <div class="icheck-primary d-inline">
                        <input type="radio" id="radioPrimary2" name="show_item" value="0" checked="checked">
                        <label for="radioPrimary2">
                          No
                        </label>
                      </div>
                     
                    </div>
                </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive">
              <table id="example1" class="table table-bordered table-striped table-head-fixed">
                <thead>
                <tr>
                  <th>ID</th>
                   <th>Camera Name</th>
                  <th>Camera</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                  <?php  foreach($get_status as $status): ?>
                   
                 
                <tr>
                  <td><?php echo $status['id'] ?></td>
                  <td><?php echo $status['camera_name'] ?></td>
                  <td><iframe id="resultsFrame" style="border: none" src="<?php echo $status['b_url']?>"></iframe></td>
                  <td><?php echo ($this->session->userdata('session_id')==1)?'Admin':'Guest' ?></td>

                 <input type="hidden" id="myId"  value="<?php echo $status['id'] ?>">

                  <? if($status['is_show']==0){?>
                  <td><button type="button" class="btn btn-primary" onclick="myFunction(<?= $status['id']?>)">Show</button></td>
                  <? }else{?>
                     <td><button type="button" class="btn btn-success">Showing</button></td>

                  <? } ?>
                

                </tr>
              <?  endforeach; ?>
                </tbody>
                <tfoot>
                <tr>
                   <th>ID</th>
                   <th>Camera Name</th>
                  <th>Camera</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
                </tfoot>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>

 