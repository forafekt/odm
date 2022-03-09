#!/usr/bin/env node

const odm = require("../../dist/odm");

const data = [{ x: "Hi", y: "bye", z: "cio" }, { a: "Hi", b: "bye", c: "cio" }];

odm(data, {
  fromObject: true,
  debug: true,
  insertIndex: true,
  keyValues: { c: "x", ok: "dddd", sme: 'c' },
});
