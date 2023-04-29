#!/bin/bash
################################################################################
#                                  README                                      #
################################################################################
# This script should be inserted on the .bashrc file after "nvm"               #
# initialization.                                                              #
################################################################################
cd ~/projects/hackme-store;

# verify if git exists first
if command -v git &> /dev/null; then
  git pull origin master;
fi

CERT_PATH=./cert.pem
if ! test -f "$CERT_PATH"; then
  openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem \
    -out cert.pem -subj "/C=US/ST=Utah/L=Lehi/O=Your Company, Inc./OU=IT/CN=yourdomain.com";
fi

# gets local machine address
ADDR=`ifconfig enp0s3 | grep -Eom1 'inet ([0-9]{1,3}\.){3}[0-9]{1,3}' | cut -d " " -f2`;

# set default port to default http/https ports
export PORT=80;
export SECURE_PORT=443;

# check if already set the file capabilities with setcap
HAS_CAPABILITY=$(getcap `readlink -f \`which node\`` | grep -Eom1 "cap_net_\w*");
if ! [[ "$HAS_CAPABILITY" == "cap_net_bind_service" ]]; then
  echo "Insert the root password to set capability \"cap_net_bind_service\" to node:";
  # allow nodejs to use net bind:
  sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\`` > /dev/null;
else
  echo "Already has capability to use default http/https ports...";
fi

# if npm exists, execute the program
if command -v npm &> /dev/null; then
  npm run migrate &> /dev/null;
  npm run seed &> /dev/null;
  export ADDR=$ADDR;
  npm run start &> logs.log &
fi

cd ~;
