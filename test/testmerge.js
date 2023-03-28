/*
 * testmerge.js - test the tmxtool merge function
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

import merge from '../src/merge.js';

export const testmerge = {
    testMergeNormal: function(test) {
        test.expect(22);

        merge({
            opt: {
                outputfile: "./test/testfiles/merge.tmx"
            }
        }, ["./test/testfiles/test1.tmx", "./test/testfiles/test2.tmx"]);

        const mergetmx = new TMX({
            path: "./test/testfiles/merge.tmx"
        });

        test.equal(mergetmx.size(), 2);

        const units = mergetmx.getTranslationUnits();
        test.ok(units);
        test.ok(Array.isArray(units));
        test.equal(units.length, 2);

        test.equal(units[0].source, "Asdf asdf");
        test.equal(units[0].sourceLocale, "en-US");

        test.equal(units[1].source, "baby baby");
        test.equal(units[1].sourceLocale, "en-US");

        let variants = units[0].getVariants();
        test.ok(variants);
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 2);

        test.equal(variants[0].string, "Asdf asdf");
        test.equal(variants[0].locale, "en-US");

        test.equal(variants[1].string, "eins zwei drei");
        test.equal(variants[1].locale, "de-DE");

        variants = units[1].getVariants();
        test.ok(variants);
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 2);

        test.equal(variants[0].string, "baby baby");
        test.equal(variants[0].locale, "en-US");

        test.equal(variants[1].string, "vier fumpf sechs");
        test.equal(variants[1].locale, "de-DE");

        test.done();
    },

    testMergeNoDifference: function(test) {
        test.expect(13);

        merge({
            opt: {
                outputfile: "./test/testfiles/merge.tmx"
            }
        }, ["./test/testfiles/test1.tmx", "./test/testfiles/test1.tmx"]);

        const mergetmx = new TMX({
            path: "./test/testfiles/merge.tmx"
        });

        test.equal(mergetmx.size(), 1);

        const units = mergetmx.getTranslationUnits();
        test.ok(units);
        test.ok(Array.isArray(units));
        test.equal(units.length, 1);

        test.equal(units[0].source, "Asdf asdf");
        test.equal(units[0].sourceLocale, "en-US");

        let variants = units[0].getVariants();
        test.ok(variants);
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 2);

        test.equal(variants[0].string, "Asdf asdf");
        test.equal(variants[0].locale, "en-US");

        test.equal(variants[1].string, "eins zwei drei");
        test.equal(variants[1].locale, "de-DE");

        test.done();
    },

    testMergeWithVariants: function(test) {
        test.expect(24);

        merge({
            opt: {
                outputfile: "./test/testfiles/merge.tmx"
            }
        }, ["./test/testfiles/testvariants1.tmx", "./test/testfiles/testvariants2.tmx"]);

        const mergetmx = new TMX({
            path: "./test/testfiles/merge.tmx"
        });

        test.equal(mergetmx.size(), 2);

        const units = mergetmx.getTranslationUnits();
        test.ok(units);
        test.ok(Array.isArray(units));
        test.equal(units.length, 2);

        test.equal(units[0].source, "Asdf asdf");
        test.equal(units[0].sourceLocale, "en-US");

        test.equal(units[1].source, "baby baby");
        test.equal(units[1].sourceLocale, "en-US");

        let variants = units[0].getVariants();
        test.ok(variants);
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 2);

        test.equal(variants[0].string, "Asdf asdf");
        test.equal(variants[0].locale, "en-US");

        test.equal(variants[1].string, "eins zwei drei");
        test.equal(variants[1].locale, "de-DE");

        variants = units[1].getVariants();
        test.ok(variants);
        test.ok(Array.isArray(variants));
        test.equal(variants.length, 3);

        test.equal(variants[0].string, "baby baby");
        test.equal(variants[0].locale, "en-US");

        test.equal(variants[1].string, "vier fumpf sechs");
        test.equal(variants[1].locale, "de-DE");

        test.equal(variants[2].string, "quatre cinq six");
        test.equal(variants[2].locale, "fr-FR");

        test.done();
    },
};
