/*
 * testdiff.js - test the tmxtool diff function
 *
 * Copyright © 2023 JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import TMX from 'ilib-tmx';
import { TranslationUnit } from 'ilib-tools-common';

import diff from '../src/diff.js';

export const testdiff = {
    testDiffNormal: function(test) {
        test.expect(13);

        diff({
            opt: {
                outputfile: "./test/testfiles/diff.tmx"
            }
        }, "./test/testfiles/test1.tmx", "./test/testfiles/test2.tmx");

        const difftmx = new TMX({
            path: "./test/testfiles/diff.tmx"
        });

        test.equal(difftmx.size(), 1);

        const units = difftmx.getTranslationUnits();
        test.ok(units);
        test.ok(Array.isArray(units));
        test.equal(units.length, 1);

        test.equal(units[0].source, "baby baby");
        test.equal(units[0].sourceLocale, "en-US");

        const variants = units[0].getVariants();
        test.ok(variants);
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 2);

        test.equal(variants[0].string, "baby baby");
        test.equal(variants[0].locale, "en-US");

        test.equal(variants[1].string, "vier fumpf sechs");
        test.equal(variants[1].locale, "de-DE");

        test.done();
    },


    testDiffNoDifference: function(test) {
        test.expect(4);

        diff({
            opt: {
                outputfile: "./test/testfiles/diff.tmx"
            }
        }, "./test/testfiles/test1.tmx", "./test/testfiles/test1.tmx");

        const difftmx = new TMX({
            path: "./test/testfiles/diff.tmx"
        });

        test.equal(difftmx.size(), 0);

        const units = difftmx.getTranslationUnits();
        test.ok(units);
        test.ok(Array.isArray(units));
        test.equal(units.length, 0);

        test.done();
    },

    testDiffWithVariants: function(test) {
        test.expect(13);

        diff({
            opt: {
                outputfile: "./test/testfiles/diff.tmx"
            }
        }, "./test/testfiles/testvariants1.tmx", "./test/testfiles/testvariants2.tmx");

        const difftmx = new TMX({
            path: "./test/testfiles/diff.tmx"
        });

        test.equal(difftmx.size(), 1);

        const units = difftmx.getTranslationUnits();
        test.ok(units);
        test.ok(Array.isArray(units));
        test.equal(units.length, 1);

        test.equal(units[0].source, "baby baby");
        test.equal(units[0].sourceLocale, "en-US");

        const variants = units[0].getVariants();
        test.ok(variants);
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 2);

        test.equal(variants[0].string, "baby baby");
        test.equal(variants[0].locale, "en-US");

        test.equal(variants[1].string, "quatre cinq six");
        test.equal(variants[1].locale, "fr-FR");

        test.done();
    },
};
