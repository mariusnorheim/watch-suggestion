import { Construct } from "constructs";
import * as codecommit from "aws-cdk-lib/aws-codecommit";


export class Repository extends Construct {
  public readonly repo: codecommit.Repository;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    // Codecommit repository
    let repository = new codecommit.Repository(this, "AppRepository", {
      repositoryName: "watch-suggestion",
      description: "Code repository for watch suggestion",
    });
    this.repo = repository;
  }
}
