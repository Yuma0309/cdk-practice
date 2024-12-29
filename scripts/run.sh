#!/usr/bin/bash

# エラー時にスクリプトを停止
set -e

# デバッグモードの設定
if [ "${LOG_LEVEL}" = "DEBUG" ]; then
  set -x
fi

# AWS認証情報の確認
# echo "AWS_PROFILE: ${AWS_PROFILE}"
echo "AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}"
echo "AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}"
aws sts get-caller-identity

# CDKスタックをデプロイ
cd cdk-container-test
echo "Deploying CDK stack"
# AWS_PROFILE=$AWS_PROFILE cdk bootstrap
# AWS_PROFILE=$AWS_PROFILE cdk deploy
# cdk bootstrap --profile $AWS_PROFILE
# cdk deploy --profile $AWS_PROFILE

cdk bootstrap
cdk deploy
