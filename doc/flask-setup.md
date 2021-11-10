Flask is a python thing so I'll set up a python virtual environment.

Make a virtual environment by going into `conway` and running this.

`python3 -m venv --prompt conway ./venv`

Here's what that means...


- `python3`. Python, I think you can do this with `python2` but Python 2 has been deprecated for over a decade so sneer at anyone and any project that uses it.
- `-m venv` The `-m` argument to `python3` means 'run this module as if it were a program'. Most modules just get imported, but some modules like `venv` and `http.server` 
- `--prompt conway ./venv` These are the arguments I'm passing to `venv`. 

And those arguments are
- `--prompt conway` This is an "optional named argument" as you can tell by the fact it starts with two hyphens, this declares the "prompt" option to have the value "conway" and in this context that means that when you activate the environment it will add the word "conway" to your terminal prompt.
- `./venv` This is a "positional argument", as you can tell by it not being preceded by any hypens. This determines the directory in which to create the virtual environment.

This creates a directory './conway/venv/' most of which we don't need to worry about, but here are the important parts
- `venv/bin` a directory containing all the exectables that you might need, and they're all already configured to use the "python" in this directory, and the libraries in this virtual environment.
- `venv/bin/activate` a shell script for making your terminal use this virtual environement. If you've installed pyenv you can use that somehow, but I always just run activate like this `. ./venv/bin/activate` (notice the `.` at the beginning) or `source ./venv/bin/activate`. These two commands are equivalent.
- `venv/lib/python3.8/site-packages/` this is the directory where all the libraries get installed.

Now, let's install flask. That's just `pip install flask`.
