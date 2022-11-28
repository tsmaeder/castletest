// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "castletest" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('castletest.showActiveDebugSession', () => {
		console.log(`the active debug session is {
			name: ${ vscode.debug.activeDebugSession?.name},
			parentSession: ${vscode.debug.activeDebugSession?.parentSession?.name}
		}}`);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('castletest.dumpTask', () => {
		type TaskItem = {
			label: string,
			task: vscode.Task
		};
		
		vscode.tasks.fetchTasks().then(tasks => {
		const items= tasks.map(task => <TaskItem>{
			label: task.name,
			task: task
		});
		vscode.window.showQuickPick(items).then(item => {
			if (item) {
				console.log(JSON.stringify(item));
			}
		});
	});
	}));


	context.subscriptions.push(vscode.commands.registerCommand('castletest.readFile', () => {
		vscode.window.showOpenDialog({title: "Read File Demo"}).then(files => {
			if (files) {
				const t0= Date.now();
				console.log('reading file...');
				vscode.workspace.fs.readFile(files[0]).then(() => {
					console.log('read file');
					const t1= Date.now();
					vscode.window.showInformationMessage(`Opening ${files[0].fsPath} took ${t1-t0}ms`, { modal: true });
				});
			}
		});
		
	}));
}

// This method is called when your extension is deactivated
export function deactivate() {}
