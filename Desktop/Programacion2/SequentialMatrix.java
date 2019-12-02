package secuencial;

import base.Matrix;

public class SequentialMatrix extends Matrix 
{
	
	public SequentialMatrix(int rDimension, int cDimension) 
	{
		super(rDimension, cDimension);
		// TODO Auto-generated constructor stub
	}

	@Override
	public double[][] multiply(Matrix secondMatrix) 
	{
		double[][] resultMatrix = new double[this.columnDimension][secondMatrix.getRowDimension()];
		
	
		return null;
	}

}
