const os = require(`os`);

var mode = `x86_64`;
var options = {
	'-netdev': `user,id=network`,
	'-device': `virtio-net-pci,netdev=network`,
	'-drive': `file=dos.img,index=0,format=raw,if=floppy`,
	'-m': `512M`,
	'-cpu': `core2duo`,
	'-smp': `${os.cpus()[`length`]}`,
	'-display': `gtk`,
	'-vga': `qxl`,
	'-boot': `menu=on`,
	'--accel': `tcg,thread=multi`
};

// Command

const iemu = require(`./src/index.js`);
const fs = require(`fs`);

const qemu = new iemu();

qemu.init(() => {
	fs.stat(`disk.qcow2`, (err, stat) => {
		if (err || stat.isDirectory()) {
			qemu.createImg(`disk.qcow2`, `512M`, {
				format: `qcow2`
			}).then(() => {
				setTimeout(start);
			});
		} else {
			setTimeout(start);
		}
	});
});

const start = () => {
	qemu[mode](options);
}