import {Sequelize} from "sequelize-typescript";
import Voter from "@/models/voter";
import Candidate from "@/models/candidate";
import Nomination from "@/models/nomination";
import Vote from "@/models/vote";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    models: [Voter, Candidate, Nomination, Vote]
});

export default sequelize