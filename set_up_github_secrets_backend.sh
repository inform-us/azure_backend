#!/bin/bash

GITHUB_TOKEN=$1

# gh auth login
gh auth login --with-token $GITHUB_TOKEN
gh secret set AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND --body "$(cat publishProfile.xml)"
rm publishProfile.xml
