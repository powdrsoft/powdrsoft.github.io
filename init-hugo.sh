hugo new site hugo
cd hugo
git submodule add --depth=1 https://github.com/nicokaiser/hugo-theme-gallery.git themes/gallery


echo 'theme = "gallery"' >> hugo.toml

