/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestManyToManyMySuffixComponent } from 'app/entities/test-many-to-many-my-suffix/test-many-to-many-my-suffix.component';
import { TestManyToManyMySuffixService } from 'app/entities/test-many-to-many-my-suffix/test-many-to-many-my-suffix.service';
import { TestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';

describe('Component Tests', () => {
    describe('TestManyToManyMySuffix Management Component', () => {
        let comp: TestManyToManyMySuffixComponent;
        let fixture: ComponentFixture<TestManyToManyMySuffixComponent>;
        let service: TestManyToManyMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestManyToManyMySuffixComponent],
                providers: []
            })
                .overrideTemplate(TestManyToManyMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestManyToManyMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestManyToManyMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TestManyToManyMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.testManyToManies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
