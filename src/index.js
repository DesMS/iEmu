const child_proc = require(`child_process`);
const cluster = require(`cluster`);
const spawn = child_proc.spawn;
const exec = child_proc.exec;

var done = false;
var dones = [];

exports = module.exports = class iEmu {
	init = init;
	createImg = createImg;
	x86 = x86;
	i386 = i386;
	x86_64 = x86_64;
	arm = arm;
	aarch64 = aarch64;
	mips = mips;
	s390x = s390x;
	m68k = m68k;
	sh4 = sh4;
	cris = cris;
	mipsel = mipsel;
	tricore = tricore;
	hppa = hppa;
	nios2 = nios2;
	mips64el = mips64el;
	microblaze = microblaze;
	riscv32 = riscv32;
	mips64 = mips64;
	xtensaeb = xtensaeb;
	microblazeel = microblazeel;
	sparc = sparc;
	sh4eb = sh4eb;
	avr = avr;
	ppc = ppc;
	alpha = alpha;
	riscv64 = riscv64;
	sparc64 = sparc64;
	xtensa = xtensa;
	ppc64 = ppc64;
	or1k = or1k;
	rx = rx;
};

const exec_qemu = async (type, options) => {
	var command = `qemu-system-${type}`;
	for (var i = 0; i < Object.keys(options).length; i += 1) {
		var keys = Object.keys([options][0]);
		if (keys[i] != i) {
			command += ` \\\n ${keys[i]} ${options[i] == undefined ? options[keys[i]] : options[i]}`; // JSON
		} else {
			command += ` \\\n ${options[i]}`; // ARRAY
		}
	}
	const qemu = exec(command);

	qemu.stdout.pipe(process.stdout);
	qemu.stderr.pipe(process.stdout);

	qemu.on(`exit`, (code) => {
		process.stdout.write(`qemu-system-${type} exited with status code ${code}\n`);
	});
}

const init = async (callback) => {
	if (typeof callback != `function`) {
		const err = new TypeError();
		err.code = 1;
		err.message = `init callback command not defined, may expect before init errors`;
		process.stdout.write(`${err.stack}\n`);
	}
	exec(`qemu-img -V`, (stdout, stderr, e) => {
		if (e) {
			const err = new ReferenceError();
			err.code = 0;
			err.message = `Qemu is not installed`;
			process.stdout.write(`${err.stack}\n`);
			process.exit(1);
		} else {
			done = true;
			setTimeout(callback);
		}
	});
}

const createImg = (file, size = `128M`, options = {}) => {
	return new Promise((res, req) => {
		if (typeof file != `string`) {
			const err = new TypeError();
			err.code = 3;
			err.message = `File variable incorrect, should be "string", instead got "${typeof file}"`;
			process.stdout.write(`${err.stack}\n`);
			process.exit(1);
		}
		if (typeof size != `string` && typeof size != `number`) {
			const err = new TypeError();
			err.code = 3;
			err.message = `Size variable incorrect, should be "string" or "number", instead got "${typeof size}"`;
			process.stdout.write(`${err.stack}\n`);
			process.exit(1);
		}
		if (typeof options != `object`) {
			const err = new TypeError();
			err.code = 3;
			err.message = `Options variable incorrect, should be "object", instead got "${typeof options}"`;
			process.stdout.write(`${err.stack}\n`);
			process.exit(1);
		}
		if (done == false) {
			const err = new ReferenceError();
			err.code = 2;
			err.message = `Called command before init, please run "init()"`;
			process.stdout.write(`${err.stack}\n`);
		} else {
			options = options || {};
			if (!options[`format`]) {
				options[`format`] = `qcow2`;
			}
			exec(`qemu-img create -f ${options[`format`]} ${file} ${size}`, async (stdout, stderr, err) => {
				if (err) {
					process.stdout.write(`${err.stack}\n`);
					process.exit(1);
				} else {
					process.stdout.write(`Created ${file} with size ${size} and format ${options[`format`]}\n`);
					res();
				}
			});
		}
	});
}

const mips = async (options = {}) => { options = options || {}; exec_qemu(`mips`, options); };
const arm = async (options = {}) => { options = options || {}; exec_qemu(`arm`, options); };
const aarch64 = async (options = {}) => { options = options || {}; exec_qemu(`aarch64`, options); };
const x86 = async (options = {}) => { options = options || {}; exec_qemu(`x86`, options); };
const x86_64 = async (options = {}) => { options = options || {}; exec_qemu(`x86_64`, options); };
const i386 = async (options = {}) => { options = options || {}; exec_qemu(`i386`, options); };
const s390x = async (options = {}) => { options = options || {}; exec_qemu(`s390x`, options); };
const m68k = async (options = {}) => { options = options || {}; exec_qemu(`m68k`, options); };
const sparc64 = async (options = {}) => { options = options || {}; exec_qemu(`sparc64`, options); };
const riscv64 = async (options = {}) => { options = options || {}; exec_qemu(`riscv64`, options); };
const xtensa = async (options = {}) => { options = options || {}; exec_qemu(`xtensa`, options); };
const sh4 = async (options = {}) => { options = options || {}; exec_qemu(`sh4`, options); };
const cris = async (options = {}) => { options = options || {}; exec_qemu(`cris`, options); };
const mipsel = async (options = {}) => { options = options || {}; exec_qemu(`mipsel`, options); };
const tricore = async (options = {}) => { options = options || {}; exec_qemu(`tricore`, options); };
const hppa = async (options = {}) => { options = options || {}; exec_qemu(`hppa`, options); };
const nios2 = async (options = {}) => { options = options || {}; exec_qemu(`nios2`, options); };
const mips64el = async (options = {}) => { options = options || {}; exec_qemu(`mips64el`, options); };
const microblaze = async (options = {}) => { options = options || {}; exec_qemu(`microblaze`, options); };
const riscv32 = async (options = {}) => { options = options || {}; exec_qemu(`riscv32`, options); };
const mips64 = async (options = {}) => { options = options || {}; exec_qemu(`mips64`, options); };
const xtensaeb = async (options = {}) => { options = options || {}; exec_qemu(`xtensaeb`, options); };
const microblazeel = async (options = {}) => { options = options || {}; exec_qemu(`microblazeel`, options); };
const sparc = async (options = {}) => { options = options || {}; exec_qemu(`sparc`, options); };
const sh4eb = async (options = {}) => { options = options || {}; exec_qemu(`sh4eb`, options); };
const avr = async (options = {}) => { options = options || {}; exec_qemu(`avr`, options); };
const ppc = async (options = {}) => { options = options || {}; exec_qemu(`ppc`, options); };
const alpha = async (options = {}) => { options = options || {}; exec_qemu(`alpha`, options); };
const ppc64 = async (options = {}) => { options = options || {}; exec_qemu(`ppc64`, options); };
const or1k = async (options = {}) => { options = options || {}; exec_qemu(`or1k`, options); };
const rx = async (options = {}) => { options = options || {}; exec_qemu(`rx`, options); };