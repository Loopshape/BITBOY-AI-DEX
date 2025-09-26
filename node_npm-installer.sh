pkg install build-essential python
git clone https://github.com/nodejs/node.git
cd node
git checkout v24.9.0
./configure
make -j$(nproc)
make install