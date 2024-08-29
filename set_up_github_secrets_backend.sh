#!/bin/bash

GITHUB_TOKEN=$1

# Loop through each secret and remove it
for secret in $(gh secret list --json name --jq '.[] | .name'); do
  gh secret remove $secret
done

# gh auth login
gh auth login --with-token $GITHUB_TOKEN
gh secret set AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND --body "$(cat publishProfile.xml)"
rm publishProfile.xml
