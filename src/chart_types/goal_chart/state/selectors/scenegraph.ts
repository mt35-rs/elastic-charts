/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License. */

import { Dimensions } from '../../../../utils/dimensions';
import { shapeViewModel } from '../../layout/viewmodel/viewmodel';
import { measureText } from '../../../partition_chart/layout/utils/measure';
import { ShapeViewModel, nullShapeViewModel } from '../../layout/types/viewmodel_types';
import { GoalSpec } from '../../specs/index';
import { mergePartial, RecursivePartial } from '../../../../utils/commons';
import { config as defaultConfig } from '../../layout/config/config';
import { Config } from '../../layout/types/config_types';

/** @internal */
export function render(spec: GoalSpec, parentDimensions: Dimensions): ShapeViewModel {
  const { width, height } = parentDimensions;
  const { config: specConfig } = spec;
  const textMeasurer = document.createElement('canvas');
  const textMeasurerCtx = textMeasurer.getContext('2d');
  const partialConfig: RecursivePartial<Config> = { ...specConfig, width, height };
  const config: Config = mergePartial(defaultConfig, partialConfig);
  if (!textMeasurerCtx) {
    return nullShapeViewModel(config, { x: width / 2, y: height / 2 });
  }
  return shapeViewModel(measureText(textMeasurerCtx), spec, config);
}
