from setuptools import setup
from opptheme import __version__

setup(
    name = 'opptheme',
    version = __version__,
    author = 'Mu Li',
    author_email= '',
    url="https://github.com/omnetpp/sphinx_opp_theme",
    description='A Sphinx theme based on Material Design, adapted from sphinx_materialdesign_theme',
    packages = ['opptheme'],
    include_package_data=True,
    license= 'MIT License',
    entry_points = {
        'sphinx.html_themes': [
            'opptheme = opptheme',
        ]
    },
)
