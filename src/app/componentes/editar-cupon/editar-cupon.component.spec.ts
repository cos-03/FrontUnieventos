import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCuponComponent } from './editar-cupon.component';

describe('EditarCuponComponent', () => {
  let component: EditarCuponComponent;
  let fixture: ComponentFixture<EditarCuponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCuponComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCuponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
