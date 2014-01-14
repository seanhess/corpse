#!/bin/bash

echo ""
echo "===================="
echo "DEPLOY"
echo "===================="

mkdir -p /var/corpse
npm install
# bower modules are synced

# set up node server
sudo cp config/server.upstart.conf /etc/init/corpse.conf
sudo stop corpse
sudo start corpse