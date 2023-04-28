# verify if git exists first
if command -v git &> /dev/null; then
  git pull origin master;
fi

# gets local machine address
ADDR=`ifconfig enp0s3 | grep -Eom1 'inet ([0-9]{1,3}\.){3}[0-9]{1,3}' | cut -d " " -f2`

# set default port to default http port
export PORT=80;
# allow nodejs to use http port:
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\`` > /dev/null;

# if npm exists, execute the program
if command -v npm &> /dev/null; then
  npm run migrate;
  npm run seed;
  export ADDR=$ADDR;
  npm run start;
fi
