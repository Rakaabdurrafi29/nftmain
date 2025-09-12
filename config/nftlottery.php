<?php

return [
  'os_path' => env('OS_PATH', '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin'),
  'node_path' => env('NODE_PATH', '/usr/bin/node'),
  'node_working_directory' => env('NODE_WORKING_DIRECTORY', '/var/www/nftlottery-sc-interaction/'),
  'user_wd_script' => env('USER_WD_SCRIPT', 'erc20.js'),
  'user_wd_check_script' => env('USER_WD_CHECK_SCRIPT', 'erc20-check.js'),
  'withdrawal_admin_fee' => env('WITHDRAWAL_ADMIN_FEE', 1)
];
