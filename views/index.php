<html>
<head>
    <title>
        php render page
    </title>
</head>
<body>
  <?php
  echo 'running on php '.PHP_VERSION.'<br />';
  if( $_POST["name"] || $_POST["age"] ) {
     echo "Welcome ". $_POST['name']. "<br />";
     echo "You are ". $_POST['age']. " years old.";
     exit();
  }else{
      ?>
      <form action="<?php $_PHP_SELF ?>" method="POST">
      Name: <input type="text" name="name" />
      Age: <input type="text" name="age" />
      <input type="submit" />
      </form>
      <?php
  }
  ?>
</body>
</html>
<?php 
exit();
?>
<pre>
<?php 

echo $_SERVER['REQUEST_METHOD'];
echo '<br/>';
echo 'Hellow world from php to: '.$_GET['u'];
echo '<br/>';
var_dump($_GET);
echo '<br/>';
var_dump($_POST);
echo '<br/>';
?>
<br>
 <?php  ?>
</pre>
<form>
    <input type='text' name='u' method='post' action="/index.php">
    <input type='hidden' name="_method" value="DELETE">
    <input type='submit'>
</form>