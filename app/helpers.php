<?php

if (!function_exists('wei_to_gwei')) {
  function wei_to_gwei($wei)
  {
    return $wei / 1000000000;
  }
}

if (!function_exists('wei_to_eth')) {
  function wei_to_eth($wei)
  {
    return $wei / 1000000000000000000;
  }
}

if (!function_exists('gwei_to_wei')) {
  function gwei_to_wei($gwei)
  {
    return $gwei * 1000000000;
  }
}

if (!function_exists('gwei_to_eth')) {
  function gwei_to_eth($gwei)
  {
    return $gwei / 1000000000;
  }
}

if (!function_exists('eth_to_gwei')) {
  function eth_to_gwei($eth)
  {
    return $eth * 1000000000;
  }
}

if (!function_exists('eth_to_wei')) {
  function eth_to_wei($eth)
  {
    return $eth * 1000000000000000000;
  }
}
