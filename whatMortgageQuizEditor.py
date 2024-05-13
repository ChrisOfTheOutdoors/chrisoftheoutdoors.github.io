import tkinter as tk
from tkinter import messagebox, filedialog
import json

class JsonEditorApp:
    def __init__(self, master):
        self.master = master
        self.master.title("JSON Editor for Mortgage Quiz")

        # Load JSON data
        self.data = self.load_json('WMIRFM\whatMortgageIsRightForMe.json')

        # Frame for the list of questions
        self.frame_list = tk.Frame(self.master)
        self.frame_list.pack(side=tk.LEFT, fill=tk.Y, padx=10, pady=10)

        # Frame for the editor
        self.frame_edit = tk.Frame(self.master)
        self.frame_edit.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)

        # Listbox for questions
        self.listbox_questions = tk.Listbox(self.frame_list, width=50, height=25)
        self.listbox_questions.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        self.listbox_questions.bind("<<ListboxSelect>>", self.on_question_select)

        # Scrollbar for listbox
        self.scrollbar = tk.Scrollbar(self.frame_list, orient="vertical")
        self.scrollbar.config(command=self.listbox_questions.yview)
        self.scrollbar.pack(side=tk.LEFT, fill=tk.Y)
        self.listbox_questions.config(yscrollcommand=self.scrollbar.set)

        # Editor fields
        self.question_text = tk.StringVar()
        self.entry_question = tk.Entry(self.frame_edit, textvariable=self.question_text, width=80)
        self.entry_question.pack(padx=10, pady=10)

        # Save button
        self.save_button = tk.Button(self.frame_edit, text="Save Changes", command=self.save_changes)
        self.save_button.pack(pady=10)

        # Populate the listbox
        self.populate_listbox()

    def load_json(self, file_path):
        with open(file_path, 'r') as file:
            return json.load(file)

    def save_json(self, file_path):
        with open(file_path, 'w') as file:
            json.dump(self.data, file, indent=4)

    def populate_listbox(self):
        self.listbox_questions.delete(0, tk.END)
        for question in self.data['questions']:
            self.listbox_questions.insert(tk.END, question['text'])

    def on_question_select(self, event):
        try:
            index = self.listbox_questions.curselection()[0]
            self.entry_question.delete(0, tk.END)
            self.entry_question.insert(0, self.data['questions'][index]['text'])
        except IndexError:
            pass

    def save_changes(self):
        try:
            index = self.listbox_questions.curselection()[0]
            self.data['questions'][index]['text'] = self.entry_question.get()
            self.save_json('whatMortgageIsRightForMe.json')
            self.populate_listbox()
            messagebox.showinfo("Success", "Changes saved successfully!")
        except Exception as e:
            messagebox.showerror("Error", str(e))

if __name__ == "__main__":
    root = tk.Tk()
    app = JsonEditorApp(root)
    root.mainloop()
