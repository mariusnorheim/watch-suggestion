## watch-suggestion
Simple react app making API queries towards moviedb.org. Will evolve into generating watch suggestions randomly or predictive based on options.

app/ - Contains the react application\
cdk/ - AWS infrastructure (as code) using Cloud Development Kit\

### Pre-requisites:
- AWS CLI
Modify CDK_DEFAULT_ACCOUNT/CDK_DEFAULT_REGION env vars or cdk/bin/cdk.ts to match your deployment account settings.

Deploy:
- cd cdk/
- npm i
- npx cdk deploy