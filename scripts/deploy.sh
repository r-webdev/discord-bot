#!/bin/sh
# Generic deployment script for webster.
export RSYNC_DESTINATION="webster@${PRODUCTION_SERVER}:/home/webster/discord-bot"

which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )

eval $(ssh-agent -s)
ssh-add <(echo "$DEPLOY_KEY")
mkdir -p ~/.ssh
echo "$HOST_FINGERPRINT" >> ~/.ssh/known_hosts

rsync -av --no-perms --no-owner --no-group --exclude '.git' ./ "${RSYNC_DESTINATION}/"
ssh "webster@${PRODUCTION_SERVER}" 'cd discord-bot/; npm install'