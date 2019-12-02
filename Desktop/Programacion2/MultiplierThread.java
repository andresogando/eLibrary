package paralelo;

public class MultiplierThread extends Thread 
{

	private int[] rowVector;
	private int[] columnVector;
	private int result;
	
	/**
	 * Constructor parametrizado 
	 * 
	 * @param rowVector
	 * @param columnVector
	 */
	public MultiplierThread(int[] rowVector, int[] columnVector)
	{
		this.setRowVector(rowVector);
		this.setColumnVector(columnVector);
	}

	public int[] getRowVector() {
		return rowVector;
	}

	public void setRowVector(int[] rowVector) {
		this.rowVector = rowVector;
	}

	public int[] getColumnVector() {
		return columnVector;
	}

	public void setColumnVector(int[] columnVector) {
		this.columnVector = columnVector;
	}

	public int getResult() {
		return result;
	}

	public void setResult(int result) {
		this.result = result;
	}
	
	/**
	 * 
	 */
	public void run()
	{
	}
	
	
}
