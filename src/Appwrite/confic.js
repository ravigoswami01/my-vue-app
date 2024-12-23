import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service{
    client = new client();
    Databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slog, content, featcherImage, status, userid}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slog,
                {
                    title,
                    content,
                    featcherImage,
                    status,
                    userid,
                }
            )
        } catch (error) {
            throw error;
        }
    }
     async updatePost(slog,{title, content, featcherImage, status, userid}){
          try {
             return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slog,
                {
                    title,
                    content,
                    status,
                    featcherImage,
                }
             )
          } catch (error) {
            throw error;
          }
    }

    async deletePost(slog){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slog,
            )
            return true
        } catch (error) {
            throw error;
            return false
        }
    }

    async getPost(slog){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slog,
            )
        } catch (error) {
            throw error;
        }
    } 
    async getPosts(Queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Queries,
            )
        } catch (error) {
            throw error;
            return false
        }

    }

    //file uplode method//
    async uplodeFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
           throw error;
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketid,
                fileId,
            )
        } catch (error) {
            throw error;
        }
    }
     async getFileprview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketid,
                fileId
            )
        } catch (error) {
            throw error;
        }
     }
}




const service = new Service()
export default service