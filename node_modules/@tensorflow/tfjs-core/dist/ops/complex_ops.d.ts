import { Tensor } from '../tensor';
import { TensorLike } from '../types';
/**
 * Converts two real numbers to a complex number.
 *
 * Given a tensor `real` representing the real part of a complex number, and a
 * tensor `imag` representing the imaginary part of a complex number, this
 * operation returns complex numbers elementwise of the form [r0, i0, r1, i1],
 * where r represents the real part and i represents the imag part.
 *
 * The input tensors real and imag must have the same shape.
 *
 * ```js
 * const real = tf.tensor1d([2.25, 3.25]);
 * const imag = tf.tensor1d([4.75, 5.75]);
 * const complex = tf.complex(real, imag);
 *
 * complex.print();
 * ```
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
declare function complex_<T extends Tensor>(real: T | TensorLike, imag: T | TensorLike): T;
/**
 * Returns the real part of a complex (or real) tensor.
 *
 * Given a tensor input, this operation returns a tensor of type float that is
 * the real part of each element in input considered as a complex number.
 *
 * If the input is real, it simply makes a clone.
 *
 * ```js
 * const x = tf.complex([-2.25, 3.25], [4.75, 5.75]);
 * tf.real(x).print();
 * ```
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
declare function real_<T extends Tensor>(input: T | TensorLike): T;
/**
 * Returns the imaginary part of a complex (or real) tensor.
 *
 * Given a tensor input, this operation returns a tensor of type float that is
 * the imaginary part of each element in input considered as a complex number.
 * If input is real, a tensor of all zeros is returned.
 *
 * ```js
 * const x = tf.complex([-2.25, 3.25], [4.75, 5.75]);
 * tf.imag(x).print();
 * ```
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
declare function imag_<T extends Tensor>(input: T | TensorLike): T;
export declare const complex: typeof complex_;
export declare const real: typeof real_;
export declare const imag: typeof imag_;
export {};
