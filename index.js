const { exec } = require("child_process");
const fs = require("fs");

async function runpackage(...packagesToinstall) {
	// =========================function which create file and folder
	async function createFolderAndFile(folderName, fileName, fileContent) {
		try {
			const fsm = require("fs").promises;
			await fsm.mkdir(folderName);
			const filePath = `${folderName}/${fileName}`;
			await fsm.writeFile(filePath, fileContent);
		} catch (error) {
			console.error(`Error creating folder or file: ${error.message}`);
		}
	}

	//  <=======================views =====================>
	const folderName = "views";
	const fileName = "index.ejs";
	const fileContent = "<h1>write here your content</h1> ";

	createFolderAndFile(folderName, fileName, fileContent);

	//  <=======================configs =====================>
	const folderModel = "config";
	const filemodel = "user.js";
	const modelcontent = `
require("dotenv").config();
const mongo = require("mongoose");
const mongo_url = process.env.MONGO_DB_URL;
    
    // Connecting to MongoDB
    mongo.set('strictQuery', false);
    mongo.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log("Successfully connected");
    }).catch((error) => {
      console.log("Connection failed: ", error.message);
      process.exit(1);
    });
    `;

	createFolderAndFile(folderModel, filemodel, modelcontent);

	//  <=======================utils =====================>
	const folderUtil = "utils";
	const fileutil = "data.js";
	const utilcontent = ``;
	createFolderAndFile(folderUtil, fileutil, utilcontent);

	//  <=======================modals =====================>
	const foldermodal = "models";
	const filemodal = "user.js";
	const modalcontent = `
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phoneno: {
                type: Number,
                required: true
            },

            });

const MyProduct = mongoose.model('AllProduct', productSchema);
module.exports = MyProduct           
    `;
	createFolderAndFile(foldermodal, filemodal, modalcontent);

	//  <=======================================utils =====================================================>
	const folderRoute = "routes";
	const fileroute = "route.js";
	const routecontent = `
const express = require('express')
const router = express.Router()

// Home route
router.route("/").get()
router.route("/").post()
router.route("/").put()
router.route("/").delete()

module.exports = router
    `;
	createFolderAndFile(folderRoute, fileroute, routecontent);

	//  <=======================================utils =====================================================>
	const folderMidelware = "middlewares";
	const filermidelware = "middle.js";
	const midelware = ``;
	createFolderAndFile(folderMidelware, filermidelware, midelware);

	//  <=======================================public folder =====================================================>

	async function FolderAndFile(folderName, fileName, fileContent) {
		try {
			const fsm = require("fs").promises;
			await fsm.mkdir(folderName);
			const filePath = `${folderName}/${fileName}`;
			await fsm.writeFile(filePath, fileContent);

			// Create subfolders inside the public folder
			const subfolders = ["html", "css", "js"];
			for (const subfolder of subfolders) {
				const subfolderPath = `${folderName}/${subfolder}`;
				await fsm.mkdir(subfolderPath);
			}
		} catch (error) {
			console.error(`Error creating folder or file: ${error.message}`);
		}
	}
	const folderpublic = "public";
	const filepublic = "index.html";
	const contentpublic = "";

	FolderAndFile(folderpublic, filepublic, contentpublic);

	// <<<<<<<<<<<<<================= Installing packages ==============================>>>>>>>>>>>

	function installPackage(packageName) {
		return new Promise((resolve, reject) => {
			exec(`npm install ${packageName}`, (error, stdout, stderr) => {
				if (error) {
					reject(
						new Error(
							`Error installing ${packageName}: ${error.message}`
						)
					);
					return;
				}
				resolve(`${packageName} successfully installed.`);
			});
		});
	}

	try {
		for (let i = 0; i < packagesToinstall.length; i++) {
			const result = await installPackage(packagesToinstall[i]);
			console.log(result);
		}
	} catch (error) {
		console.error(error.message);
	}
}



module.exports = runpackage;
