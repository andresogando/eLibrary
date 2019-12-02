/**
 * 
 */
package paralelo;

import base.Matrix;

/**
 * @author Manuel
 *
 */
public class ParallelMatrix extends Matrix {

	/* (non-Javadoc)
	 * @see base.Matrix#multiply(base.Matrix)
	 */
	
	/**
	 * Constructor parametrizado
	 * 
	 * @param rDimension
	 * @param cDimension
	 */
	public ParallelMatrix(int rDimension, int cDimension)
	{
		super(rDimension, cDimension);
	}
	
	@Override
	public double[][] multiply(Matrix secondMatrix) {
		// TODO Auto-generated method stub
		return null;
	}

}
