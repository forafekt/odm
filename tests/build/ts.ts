#!/usr/bin/env ts-node

import odm from "../../dist/odm";

const data = [{ x: "Hi", y: "bye", z: "cio" }, { a: "Hi", b: "bye", c: "cio" }];

odm(data, {
  fromObject: true,
  debug: true,
  insertIndex: true,
  keyValues: { c: "x", ok: "dddd", sme: 'c' },
});
